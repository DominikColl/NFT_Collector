// https://opensea.io/
import React from 'react'
import { uploadFile,readUserFiles,getFileNames } from '../context/AuthContext'

export default class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fileData:[]
    }
  }
  async componentDidMount () {
      let fileURLS=[]
    let fileNames= await getFileNames()
fileNames.map(item=>{
  console.log(item)
 let t= readUserFiles('1',item)
//  console.log(t)
 t.then(t=>{
   console.log(t)
   t={t,item}
   this.setState({ fileData: [...this.state.fileData, t] })
 })
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
    let {fileData}=this.state
const collectionList=fileData.map(fd=>{
  return(
    <li>
       <img src={fd.t} width='300px'/>
      <h2>{fd.item}</h2>
    </li>
  )
})
    return (
      <div className='wrapper'>
      <h2>Add To Collection</h2>
      <input className='button' type='file' onChange={this.fileInputChange}/>
      <ul id='collectionDisplay'>
{collectionList}
      </ul>
      
      </div>
    )
  }
}
