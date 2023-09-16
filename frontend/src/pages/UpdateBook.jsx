
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

function UpdateBook() {

  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
    .then((response) => {
      setAuthor(response.data.author)
      setTitle(response.data.title)
      setPublishYear(response.data.publishYear)
      setLoading(false)
    })
    .catch((error) => {
      alert('An error occured please try again.')
      console.log(error)
    })
  }, [])

  const handleUpdateBook = () => {
    const data = {
      title,
      author,
      publishYear
    };
    setLoading(true);
    axios
    .put(`http://localhost:5555/books/${id}`, data)
    .then(() => {
      setLoading(false)
      navigate('/')
    })
    .catch((error) => {
      alert('An error occured, Please check console.')
      console.log(error)
    })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Update Book</h1>
      {loading ? <Spinner /> : '' }
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
            <label className='text-xl mr-4 text-grey-400'>Title</label>
            <input 
              className='border-2 border-gray-500 px-4 py-2 w-full'
              type='text' 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className='my-4'>
            <label className='text-xl mr-4 text-grey-400'>Author</label>
            <input 
              className='border-2 border-gray-500 px-4 py-2 w-full'
              type='text' 
              value={author} 
              onChange={(e) => setAuthor(e.target.value)}/>
        </div>
        <div className='my-4'>
            <label className='text-xl mr-4 text-grey-400'>Publish Year</label>
            <input 
              className='border-2 border-gray-500 px-4 py-2 w-full'
              type='text' 
              value={publishYear} 
              onChange={(e) => setPublishYear(e.target.value)}/>
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleUpdateBook}>Save</button>
      </div>
    </div>
  )
}

export default UpdateBook