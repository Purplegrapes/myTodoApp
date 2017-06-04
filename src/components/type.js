import React, { Component, PropTypes } from 'react';
import { reduce, prop, filter, map } from 'lodash/fp';
import { Icon, Modal } from 'antd';
import uuid from 'uuid';
const colors = ['#04A3FF', '#FFA400', '#008B00', '#C1232B', '#27727B', '#FCCE10', '#E87C25', '#B5C334',
  '#FE8463', '#9BCA63'];
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
        change: false,
        color: '',
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
  addType = () => {
    const { text, color } = this.state;
    const { addType } = this.props;
    if (text !== '') {
      addType(text, color);
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
    hideColor = () => {
      this.setState({
        change: false,
      })
    };
    showColor = () => {
      this.setState({
        change: true,
      })
    };
  changeColor = (color) => {
    this.setState({
      color,
      change: false,
    })
  };
    render() {
      const { types } = this.props;
        return (
            <div className='Box'>
                <div className='typeBox'>
                    <h2>备忘分类</h2>
                    <div className='types'>
                        {map(({ id, name, color }) => {
                          return (
                            <div
                              key={id}
                              onClick={this.changeType(id)}
                              className={this.getActiveClass(id)}
                              style={{ color }}
                            >
                              <span className="Radius" style={{ backgroundColor: color}}/>
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
                    onOk={this.addType}
                    onCancel={this.hideInput}
                  >
                    <input
                      style={{ height: "30px", width: "100%"}}
                      type="text"
                      placeholder="请输入需要添加的分类"
                      value={this.state.text}
                      onChange={this.handleChange}
                      onKeyDown={this.handleKeyDown}
                    />
                    <div style={{ marginTop: "10px"}} className="Flex">
                      <div>
                        <Icon type="tag" className="Icon" />
                        <span>颜色</span>
                      </div>
                      <div>
                        <span className="Radius" style={{ backgroundColor: this.state.color}}/>
                        <Icon type="right" className="Icon" onClick={this.showColor} />
                      </div>


                    </div>
              </Modal>
              <Modal
                title="颜色"
                visible={this.state.change}
                onCancel={this.hideColor}
                footer={null}
              >
                <div style={{ marginTop: "10px"}}>
                  {map(color => <span key={uuid.v4()} onClick={() => this.changeColor(color)} className="Radius" style={{ backgroundColor: color}}/>)(colors)}

                </div>
              </Modal>
            </div>
        );
    }
}

export default About;


