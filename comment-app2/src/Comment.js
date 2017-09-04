import React,{Component} from 'react';
//import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'

class Comment extends Component{
	static PropTypes={
		comment:PropTypes.object.isRequires
	}
	constructor(){
		super()
		this.state={ timeString:''}
	}
	
	componentWillMount(){
		this._updateTimeString()
		this._timer=setInterval(
		   this._updateTimeString.bind(this),
		   5000
		)
	}
	componentWillUnmount(){
		clearInterval(this._timer)
	}
	//更新时间字符
	_updateTimeString(){
		const comment=this.props.comment
		//console.log('time:'+comment.createdTime)
		const duration=(+Date.now()-comment.createdTime)/1000
		this.setState({
			timeString: duration>60
			? `${Math.round(duration/60)} 分钟前`
			: `${Math.round(Math.max(duration,1))}秒前` 
		})
	}
	//处理代码块
	_getProcessedContend(content){
		return content
		  .replace(/&/g,"&amp;")
		  .replace(/</g,"&lt;")
		  .replace(/>/g,"&gt;")
		  .replace(/"/g,"&quot;")
		  .replace(/'/g,"&#039")
		  .replace(/`([\S\s]+?)`/g,'<code>$1</code>')
	
	}
	
	//删除评论
	handleDeleteComment(){
		if(this.props.onDeleteComment){
			this.props.onDeleteComment(this.props.index)
		}
	}
	
	
	render(){
		return(
		  <div className='comment'>
		    <div className='comment-user'>
			     <span>{this.props.comment.username}</span>：
			</div>
			
			<p dangerouslySetInnerHTML={{
			     __html:this._getProcessedContend(this.props.comment.content) 
			}}/>
			
			<span className='comment-createdtime'>
			    {this.state.timeString}
			</span>
			<span 
			  onClick={this.handleDeleteComment.bind(this)}
			  className='comment-delete'>
			    删除
			</span>
		  </div>
		)
	}
}

export default Comment