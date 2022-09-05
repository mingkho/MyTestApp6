"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const CommandsUtil = require("../../../libs/Commands");
const vscode_1 = require("vscode");
const ChildProcessUtil = require("../../../libs/ChildProcess/ChildProcess");
const fs = require("fs");
describe('Workspace', () => {
    let cmdSpy;
    const sandbox = (0, sinon_1.createSandbox)();
    beforeEach(() => {
        cmdSpy = sandbox.stub(vscode_1.commands, 'executeCommand').returns(Promise.resolve(0));
    });
    afterEach(() => sandbox.restore());
    it('can detect BAS', () => {
        const execStub = sandbox.stub(ChildProcessUtil, 'exec').returns(Promise.resolve('foobar'));
        return CommandsUtil.refreshIsInBas()
            .then(res => expect(res).toBe(true))
            .then(() => {
            execStub.reset();
            execStub.returns(Promise.resolve(''));
            return CommandsUtil.refreshIsInBas().then(res => expect(res).toBe(false));
        })
            .then(() => {
            execStub.reset();
            execStub.returns(Promise.reject(''));
            return CommandsUtil.refreshIsInBas().then(res => expect(res).toBe(false));
        });
    });
    it('can detect existence of file', () => {
        const existsStub = sandbox.stub(fs, 'existsSync').returns(false);
        expect(CommandsUtil.exists('')).toBe(false);
        existsStub.reset();
        existsStub.returns(true);
        expect(CommandsUtil.exists('')).toBe(true);
    });
    it('can detect detect local repo', () => {
        const execStub = sandbox.stub(ChildProcessUtil, 'exec').returns(Promise.resolve('foobar'));
        return CommandsUtil.hasLocalRepo()
            .then(res => {
            expect(res).toBe(true);
            execStub.reset();
            execStub.returns(Promise.resolve(''));
            return CommandsUtil.hasLocalRepo();
        })
            .then(res => {
            expect(res).toBe(false);
            execStub.reset();
            execStub.returns(Promise.reject(''));
            return CommandsUtil.hasLocalRepo();
        })
            .then(res => {
            expect(res).toBe(false);
        });
    });
    it('can detect detect remote repo', () => {
        const execStub = sandbox.stub(ChildProcessUtil, 'exec').returns(Promise.resolve('foobar'));
        return CommandsUtil.hasRemoteRepo()
            .then(res => {
            expect(res).toBe(true);
            execStub.reset();
            execStub.returns(Promise.resolve(''));
            return CommandsUtil.hasRemoteRepo();
        })
            .then(res => {
            expect(res).toBe(false);
            execStub.reset();
            execStub.returns(Promise.reject(''));
            return CommandsUtil.hasRemoteRepo();
        })
            .then(res => {
            expect(res).toBe(false);
        });
    });
    it('can get dev proj cli', () => {
        const info = CommandsUtil.getDevProjCLI();
        expect(typeof info.cmd).toBe('string');
        expect(info.args).toBeInstanceOf(Array);
    });
    it('can wrap cmd', () => CommandsUtil.getCmdFor('')
        .then(cmd => {
        expect(cmd.includes('lwctl')).toBe(false);
        sandbox.stub(CommandsUtil, 'isInBAS').value(Promise.resolve(true));
        return CommandsUtil.getCmdFor('');
    })
        .then(cmd => expect(cmd.includes('lwctl')).toBe(true)));
    it('can get pid list', () => {
        const inBasStub = sandbox.stub(CommandsUtil, 'isInBAS').value(Promise.resolve(true));
        const execStub = sandbox.stub(ChildProcessUtil, 'exec').returns(Promise.resolve(''));
        return CommandsUtil.pidsFrom('test')
            .then(res => {
            expect(res).toBeInstanceOf(Array);
            inBasStub.reset();
            inBasStub.value(Promise.resolve(false));
            return CommandsUtil.pidsFrom('test');
        })
            .then(() => CommandsUtil.pidsFrom(''))
            .then(() => {
            inBasStub.reset();
            inBasStub.value(Promise.reject());
            return CommandsUtil.pidsFrom('test');
        })
            .then(res => {
            expect(res.length).toBe(0);
            return CommandsUtil.pidsFrom('');
        })
            .then(res => {
            expect(res.length).toBe(0);
            return CommandsUtil.pidsFrom(undefined);
        })
            .then(res => expect(res.length).toBe(0));
    });
    it('can free pids', () => {
        const execStub = sandbox.stub(ChildProcessUtil, 'exec').returns(Promise.resolve(''));
        return CommandsUtil.freeViaSh('')
            .then(() => {
            expect(execStub.called).toBe(true);
            sandbox.stub(CommandsUtil, 'isInBAS').value(Promise.resolve(true));
            return CommandsUtil.freeViaSh('');
        }).then(() => {
            return CommandsUtil.freeViaSh();
        });
    });
});
//# sourceMappingURL=Commands.spec.js.map