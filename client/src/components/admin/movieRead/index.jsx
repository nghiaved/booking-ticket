import React, { useState, useEffect } from 'react'
import { URL } from '../../../utils'
import { apiMovieRead, apiMovieDelete } from '../../../services'

function MovieRead() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        let res = await apiMovieRead()
        setMovies(res.data.movie)
    }

    const deleteMovie = async id => {
        await apiMovieDelete(id)
        alert('Success')
        fetchData()
    }

    return (
        <div className='admin-movie-read'>
            <div className='read-container'>
                <div className='title'>
                    Danh sách phim
                </div>
                <div className='list-movies'>
                    {movies && movies.map(item =>
                        <div key={item._id} className='item'>
                            <div className='film'>
                                <img src={`${URL.SERVER}/${item.image}`} alt="" />
                                {item.title}
                            </div>
                            <div className='feature'>
                                <i className="fa-solid fa-pen"></i>
                                <i onClick={() => deleteMovie(item._id)} className="fa-solid fa-trash"></i>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
}

export default MovieRead;