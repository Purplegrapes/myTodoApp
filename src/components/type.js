import React, { Component, PropTypes } from 'react';
import { reduce, prop, filter } from 'lodash/fp';
class About extends Component {
    static propTypes = {
        typeTodos: PropTypes.array.isRequired,
        todos: PropTypes.array.isRequired,
        selectType: PropTypes.func,
    };

    state = {
        currentId: 'person',
    };

    getActiveClass = id => {
        return id === this.state.currentId ? "type typeActive" : "type";

    };

    changeType = id => () => {
        const { selectType } = this.props;
        selectType(id);
        this.setState({
            currentId: id
        })

    };
    renderLength = type => () => {
        const { todos } = this.props;
        const typeList = filter(todo => todo.type === type)(todos);
        const todoNumber = reduce((count, item) => prop('completed')(item) ? count : count + 1, 0)(typeList);
        return todoNumber === 0 ? null : todoNumber;
    };
    render() {

        return (
            <div className='Box'>
                <div className='typeBox'>
                    <h2>备忘分类</h2>
                    <div className='types'>
                        {React.Children.map(this.props.children,(element) => {
                            return (
                                <div
                                    onClick={this.changeType(element.props.id)}
                                    className={this.getActiveClass(element.props.id)}
                                >
                                    {element.props.name} {this.renderLength(element.props.id)()}
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        );
    }
}

export default About;


