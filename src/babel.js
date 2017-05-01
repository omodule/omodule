import nodePath from 'path';
const CHILD_FOLDER_NAME = 'omodules';
const OMODULE = 'omodule';
const sep = '/';

function normalizePath(path = '') {
    return path.replace(/\\/g, sep);
}

function getRelativePath(path, state) {
    if (state.file.opts.moduleRoot) {
        return state.file.opts.filename.replace(state.file.opts.moduleRoot + nodePath.sep, '');
    } else {
        return state.file.opts.filename;
    }
}

function getNames(path, state) {
    const filePath = getFilePath(path, state);
    return filePath.split(sep);
}

function getName(path, state) {
    const namespace = getNamespace(path, state);
    const omoduleNames = namespace.split(sep);
    return omoduleNames[omoduleNames.length - 1];
}

function getNamespace(path, state) {
    const names = getNames(path, state);
    const res = names.reduce(
        (acc, val) => {
            if (!acc.done) {
                if (acc.lastVal && acc.lastVal !== CHILD_FOLDER_NAME && val !== CHILD_FOLDER_NAME) {
                    return { ...acc, ...{ done: true } };
                } else {
                    const self = val !== CHILD_FOLDER_NAME ? val : '';
                    let namespace = acc.namespace || '';
                    if (namespace && self) {
                        namespace = namespace + '/' + self;
                    } else {
                        namespace = self || namespace;
                    }
                    return { ...acc, ...{ namespace, lastVal: val } };
                }
            } else {
                return { ...acc };
            }
        },
        {
            done: false,
            lastVal: null
        }
    );
    return res.namespace;
}

function getFilePath(path, state) {
    return normalizePath(getRelativePath(path, state));
}

export default function({ types: t }) {
    return {
        visitor: {
            Identifier(path, state) {
                if (this.done === true) {
                    path.stop();
                    return;
                }
                if (path.node.name === OMODULE && !t.isFunctionDeclaration(path.parent)) {
                    this.done = true;
                    const program = path.findParent(path => path.isProgram());
                    program.unshiftContainer(
                        'body',
                        t.variableDeclaration('var', [
                            t.variableDeclarator(
                                t.identifier(OMODULE),
                                t.objectExpression([
                                    t.objectProperty(
                                        t.identifier('name'),
                                        t.stringLiteral(getName(path, state))
                                    ),
                                    t.objectProperty(
                                        t.identifier('namespace'),
                                        t.stringLiteral(getNamespace(path, state))
                                    ),
                                    t.objectProperty(
                                        t.identifier('filePath'),
                                        t.stringLiteral(getFilePath(path, state))
                                    )
                                ])
                            )
                        ])
                    );
                }
            }
        }
    };
}
