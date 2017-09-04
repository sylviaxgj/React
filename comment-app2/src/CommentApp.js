import React ,{Component} from 'react';
import CommentInput from './CommentInput'
import CommentList from './CommentList'
//import ReactDOM from 'react-dom';

class CommentApp extends Component{
	constructor(){
		super()
		this.state={
			comments:[]
		}
	}
	
	//加载评论
	componentWillMount(){
		this._loadComments()
	}
	
	_loadComments(){
		let comments=localStorage.getItem('comments')
		if(comments){
			comments=JSON.parse(comments)
			this.setState({comments})
		}
	}
	//保存评论
	_saveComments(comments){
		localStorage.setItem('comments',JSON.stringify(comments))
	}
	
	handleSubmitComment (comment){
		if(!comment) return
		if(!comment.username) return alert('请输入用户名')
		if(!comment.content) return alert('请输入评论内容')
		const comments=this.state.comments;
	    comments.push(comment);
	    this.setState({ comments })
		this._saveComments(comments)
	}
	
	//删除评论
	handleDeleteComment(index){
		const comments=this.state.comments
		comments.splice(index,1)
		this.setState({comments})
		this._saveComments(comments)
	}
	render(){
		return(
		   <div className='wrapper'>
		       <CommentInput onSubmit={this.handleSubmitComment.bind(this)}/>
			   <CommentList 
			   comments={this.state.comments}
			   onDeleteComment={this.handleDeleteComment.bind(this)}/>
		   </div>
		)
	}
}


export default CommentApp