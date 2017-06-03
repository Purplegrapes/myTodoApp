import React, { Component, PropTypes } from 'react';
import { reduce, prop, filter, map } from 'lodash/fp';
import { Icon, Modal } from 'antd';

class About extends Component {
    static propTypes = {
        typeTodos: PropTypes.array.isRequired,
        todos: PropTypes.array.isRequired,
        selectType: PropTypes.func,
    };

    state = {
        currentId: 'person',
        show: false,
        text: '',
    };
  handleKeyDown = (e) => {
    const { text } = this.state;
    const { addType } = this.props;
    if (e.keyCode === 13 && e.target.value !== '') {
      addType(text);
      this.setState({
        text: '',
      });
    }
  };
  addTodo = () => {
    const { text } = this.state;
    const { addType } = this.props;
    if (text !== '') {
      addType(text);
      this.setState({
        text: '',
      });
    }
    this.setState({
      show: false
    })
  };
  handleChange = ({ target: { value } }) => {
    this.setState({ text: value });
  };

  showInput = () => {
    this.setState({
      text: '',
      show: true,
    });
  };

  hideInput = () => {
    this.setState({
      show: false,
    });
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
      const { types } = this.props;
        return (
            <div className='Box'>
                <div className='typeBox'>
                    <h2>备忘分类</h2>
                    <div className='types'>
                        {map(({ id, name }) => {
                          return (
                            <div
                              onClick={this.changeType(id)}
                              className={this.getActiveClass(id)}
                            >
                              {name} {this.renderLength(id)()}
                            </div>
                          )
                        })(types)}
                    </div>
                </div>
              <div onClick={this.showInput}  style={{ marginRight: "80px"}} className='addBox'>
                <Icon type="plus" />
                <a className='add'>添加分类</a>
              </div>
              <Modal
                    title="添加分类"
                    visible={this.state.show}
                    onOk={this.addTodo}
                    onCancel={this.hideInput}
                  >
                    <input
                      style={{ height: "30px", width: "80%"}}
                      type="text"
                      value={this.state.text}
                      onChange={this.handleChange}
                      onKeyDown={this.handleKeyDown}
                    />
                  </Modal>
            </div>
        );
    }
}

export default About;


