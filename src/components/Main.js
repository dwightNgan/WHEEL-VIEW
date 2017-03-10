require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerBottom: '-100%',//弹窗其实位置
      linkageData: [
        {
          name: '广东',
          Second: [
            {
              name: '中山',
              Third: [
                '石歧',
                '南朗',
                '小榄',
                '坦洲'
              ]
            },
            {
              name: '珠海',
              Third: [
                '香洲',
                '斗门',
                '横琴'
              ]
            },
            {
              name: '中山',
              Third: [
                '石歧',
                '南朗',
                '小榄',
                '坦洲'
              ]
            },
            {
              name: '珠海',
              Third: [
                '香洲',
                '斗门',
                '横琴'
              ]
            },
            {
              name: '中山',
              Third: [
                '石歧',
                '南朗',
                '小榄',
                '坦洲'
              ]
            },
            {
              name: '珠海',
              Third: [
                '香洲',
                '斗门',
                '横琴'
              ]
            }
          ]
        },
        {
          name: '台湾',
          Second: [
            {
              name: '新竹',
              Third: [
                '香山',
                '东区',
                '西区'
              ]
            },
            {
              name: '台北',
              Third: [
                '信义区'
              ]
            }
          ]
        },
        {
          name: '广东',
          Second: [
            {
              name: '中山',
              Third: [
                '石歧',
                '南朗',
                '小榄',
                '坦洲'
              ]
            },
            {
              name: '珠海',
              Third: [
                '香洲',
                '斗门',
                '横琴'
              ]
            }
          ]
        },
        {
          name: '台湾',
          Second: [
            {
              name: '新竹',
              Third: [
                '香山',
                '东区',
                '西区'
              ]
            },
            {
              name: '台北',
              Third: [
                '信义区'
              ]
            }
          ]
        }
      ],
      FirstTranslateYEnd: 0,//一级选择器的位移初始位置
      SecondTranslateYEnd: 0,//二级选择器的位移初始位置
      ThirdTranslateYEnd: 0,//三级选择器的位移初始位置
      FirstIdx: 0,//被选中一级的序号
      SecondIdx: 0,//被选中二级的序号
      ThirdIdx: 0//被选中三级的序号
    };
  }

  //显示选择器弹窗
  handleButtonClick() {
    this.setState({pickerBottom: 0})
  }

  //关闭选择器弹窗
  handleCancel() {
    this.setState({pickerBottom: '-100%'})
  }

  /*
   * 处理选择器改变的函数
   * 参数:
   *   type:改变的选择器的类型('First','Second','Third',类型string)
   *   index:被选中的选项的序号(类型number)
   * */
  handlePickerChange(type, index) {
    switch (type) {
      case 'First'://处理一级选择器的改变
        this.setState({
          FirstIdx: index,//被选中的一级
          SecondTranslateYEnd: 0,//以下为还原二级和三级位移和被选中设置
          SecondTranslateY: 0,
          ThirdTranslateYEnd: 0,
          ThirdTranslateY: 0,
          SecondIdx: 0,
          ThirdIdx: 0
        });
        break;
      case 'Second'://处理二级选择器的改变
        this.setState({
          SecondIdx: index,//被选中的二级
          ThirdTranslateYEnd: 0,//以下为还原三级位移和被选中设置
          ThirdTranslateY: 0,
          ThirdIdx: 0
        });
        break;
      case 'Third'://处理三级选择器的改变
        this.setState({ThirdIdx: index});//被选中的三级
        break

    }
  }

  /*
   * 以下三个为处理选择器改变的动画的函数
   * 相关变量:
   *   this.linkageDataType:为被选中选中类型(通过e传回来的参数:'First','Second','Third')
   *   this.linkageDataType+TranslateYStart:每个选择器位移前鼠标位于页面的点
   *   this.linkageDataType+TranslateYEnd:每个选择器上一次位移到的位置
   *   this.linkageDataType+TranslateY:每个选择器每次位移的位置
   *
   * */
  handleMouseDown(e) {
    this.linkageDataType = e.currentTarget.dataset.type;
    let obj = {};
    obj.move = true;
    obj.transition = '';
    obj[this.linkageDataType + 'TranslateYStart'] = e.pageY;
    this.setState(obj);
  }

  handleMouseMove(e) {
    if (this.state.move && e.pageY) {
      let obj = {};
      obj[this.linkageDataType + 'TranslateY'] = e.pageY - this.state[this.linkageDataType + 'TranslateYStart'] + this.state[this.linkageDataType + 'TranslateYEnd'];
      this.setState(obj)
    }
  }

  handleMouseUp() {
    let ty;
    if (this.state[this.linkageDataType + 'TranslateY'] > 0) {
      ty = 0;
    } else {
      ty = Math.ceil((this.state[this.linkageDataType + 'TranslateY'] - 24) / 48);
    }
    this.handlePickerChange(this.linkageDataType, Math.abs(ty));
    let obj = {};
    obj.move = false;
    obj[this.linkageDataType + 'TranslateYEnd'] = ty * 48;
    obj[this.linkageDataType + 'TranslateY'] = ty * 48;
    obj.transition = 'transform 0.5s';
    this.setState(obj)
  }

  //处理确认按钮的函数
  handleConfirm() {
    let linkageData = this.state.linkageData;
    this.setState({
      pickerBottom: '-100%',//隐藏弹窗
      pickedData: (//输出的数据
        linkageData[this.state.FirstIdx].name + '-' +
        linkageData[this.state.FirstIdx].Second[this.state.SecondIdx].name + '-' +
        linkageData[this.state.FirstIdx].Second[this.state.SecondIdx].Third[this.state.ThirdIdx]
      )
    })
  }

  /*
   * 生成渲染的选择器的内容
   * */
  render() {
    let First = [],
      Second = [],
      Third = [],
      linkageData = this.state.linkageData,
      FirstIdx = this.state.FirstIdx,
      SecondIdx = this.state.SecondIdx;
    //生成一级选择器的内容
    linkageData.forEach(function (item, index) {
      First.push(
        <div key={index}>{item.name}</div>
      );
    }.bind(this));
    //生成二级选择器的内容
    linkageData[FirstIdx].Second.forEach(function (item, index) {
      Second.push(
        <div key={index}>{item.name}</div>
      );
    }.bind(this));
    //生成三级选择器的内容
    linkageData[FirstIdx].Second[SecondIdx].Third.forEach(function (item, index) {
      Third.push(
        <div key={index}>{item}</div>
      )
    }.bind(this));

    return (
      <div>
        <button onClick={this.handleButtonClick.bind(this)}>选择区域</button>
        <div className="output">{this.state.pickedData}</div>
        <div className='picker' style={{bottom: this.state.pickerBottom}}>
          <div className='head'>
            <span className='cancel' onClick={this.handleCancel.bind(this)}>取消</span>
            <span className='confirm' onClick={this.handleConfirm.bind(this)}>确定</span>
          </div>
          <div className='pickers'>
            <div
              className='First'
              style={{
                transform: 'translateY(' + this.state.FirstTranslateY + 'px)',
                transition: this.state.transition
              }}>
              {First}
            </div>
            <div className='Second'
                 style={{
                   transform: 'translateY(' + this.state.SecondTranslateY + 'px)',
                   transition: this.state.transition
                 }}>
              {Second}
            </div>
            <div className='Third'
                 style={{
                   transform: 'translateY(' + this.state.ThirdTranslateY + 'px)',
                   transition: this.state.transition
                 }}>
              {Third}
            </div>
            <div className="chosen"></div>
            <div className="chosen"></div>
          </div>
          <div className="cover">
            <div
              data-type='First'
              onMouseDown={this.handleMouseDown.bind(this)}
              onMouseMove={this.handleMouseMove.bind(this)}
              onMouseUp={this.handleMouseUp.bind(this)}></div>
            <div
              data-type='Second'
              onMouseDown={this.handleMouseDown.bind(this)}
              onMouseMove={this.handleMouseMove.bind(this)}
              onMouseUp={this.handleMouseUp.bind(this)}></div>
            <div
              data-type='Third'
              onMouseDown={this.handleMouseDown.bind(this)}
              onMouseMove={this.handleMouseMove.bind(this)}
              onMouseUp={this.handleMouseUp.bind(this)}></div>
          </div>
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
