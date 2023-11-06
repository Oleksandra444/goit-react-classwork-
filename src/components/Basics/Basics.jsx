import { Component } from "react";

// const Button = ({value, onUpdate} ) => {
//         return (<button onClick={onUpdate}>
//             Clicks: {value}
//         </button>);
//     }


// export class Basics extends Component  {
//       state={
//     clicks: 0,
//     }

//      updateClicks = () => {
//         this.setState(prevState => { return { clicks: prevState.clicks + 1 } })
//     }
    
    
//     render() {
//         return (
//         <div>
//                 <Button value={this.state.clicks} onUpdate={this.updateClicks} />
//             <Button value={this.state.clicks} onUpdate={this.updateClicks} />
//         </div>
//     ); }
    

// }
const Button = ({ value, onUpdate }) => { 
    return (<button onClick={onUpdate}>Clicks: {value }</button>)

}


export class Basics extends Component { 
    state = {
        clicks: 0,
    }

    increment = () => { 
        this.setState(prevState => { 
            return {clicks: prevState.clicks+1}
}
        )
    }

    decrement = () => { 
        this.setState(prevState => { return {clicks: prevState.clicks-1} })
    }
    
    
    render() { 
        return (
            <div>
                <Button value={this.state.clicks} onUpdate={ this.increment}  />
                <Button value={this.state.clicks} onUpdate={ this.decrement}/>
            </div>
        )
    }
}