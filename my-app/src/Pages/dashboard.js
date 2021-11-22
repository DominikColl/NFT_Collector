import React from 'react'
import { uploadFile,readUserFiles,getFileNames } from '../context/AuthContext'

export default class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fileNames:[]
    }
  }
  componentDidMount () {
      let fileURLS=[]
let fileNames=getFileNames()
fileNames.then(fileNames=>{
this.setState({fileNames})
fileNames.map(name=>{
    let r=readUserFiles('1',name)
    r.then(r=>{
        // console.log(r)
        fileURLS.push(r)
    })
})
this.setState({fileURLS})
})
  }
 fileInputChange=e=>{
    console.log(e.target.files[0])
    let {name,type}=e.target.files[0]
    let file=e.target.files[0]
    let response=uploadFile(file,'1',name)
    console.log(response)
 }
  render () {
    console.log(this.state)
    let {fileNames,fileURLS}=this.state
console.log(fileURLS)

    return (
      <div>
      <h2>Add To Collection</h2>
      <input type='file' onChange={this.fileInputChange}/>
      <ul id='collectionDisplay'>

      </ul>
      
      </div>
    )
  }
}
