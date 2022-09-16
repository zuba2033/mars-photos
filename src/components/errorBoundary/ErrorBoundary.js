import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({
            error: true
        })
    }

    render() {

        const style = {
            color: "black",
            textAlign: "center"
        };

        if (this.state.error) {
            return <div>
                        <h2 style={style} >Something goes wrong</h2>;
                        <ErrorMessage/>
                    </div>
        } else {
            return this.props.children;
        }
    }

}

export default ErrorBoundary;