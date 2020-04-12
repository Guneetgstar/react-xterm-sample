import React, {Component} from 'react';
import './App.css';
import XTerm, {Terminal} from "react-xterm";
import "xterm/css/xterm.css";
interface IState {
}
interface IProps {
}
class App extends Component<IProps, IState> {

    constructor(props: IProps, context?: any) {
        super(props, context);
        this.inputRef=React.createRef()
    }
    componentDidMount() {
        runFakeTerminal(this.inputRef.current!!);
    }
    componentWillUnmount() {
        this.inputRef.current?.componentWillUnmount();
    }

    private inputRef: React.RefObject<XTerm>;

    render() {
        return (
            <div className="App">
                <XTerm ref={this.inputRef}
                       addons={['fit', 'fullscreen', 'search']}
                       style={{
                        overflow: 'hidden',
                        position: 'relative',
                        width: '100%',
                        height: '100%'
                       }}/>
            </div>
        );
    }
}

function runFakeTerminal(xterm: XTerm) {
    const term: Terminal = xterm.getTerminal();
    var shellprompt = '$ ';

    function prompt () {
        xterm.write('\r\n' + shellprompt);
    }
    xterm.writeln('Welcome to xterm.js');
    xterm.writeln('This is a local terminal emulation, without a real terminal in the back-end.');
    xterm.writeln('Type some keys and commands to play around.');
    xterm.writeln('');
    prompt();

    term.on('key', function (key, ev) {
        var printable = (
            !ev!!.altKey && !ev!!.ctrlKey && !ev!!.metaKey
        );

        if (ev!!.keyCode == 13) {
            prompt();
            // } else if (ev.keyCode == 8) {
            //   // Do not delete the prompt
            //   if (term['x'] > 2) {
            //     xterm.write('\b \b');
            //   }
        } else if (printable) {
            xterm.write(key);
        }
    });

    term.on('paste', function (data, ev) {
        xterm.write(data);
    });
}

export default App;
