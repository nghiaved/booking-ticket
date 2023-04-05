import React from 'react'
import { useForm } from 'react-hook-form'
import { apiCinemaCreate } from '../../../services'

function CinemaCreate() {
    const { register, handleSubmit } = useForm()

    const onSubmit = async (data, e) => {
        const formData = new FormData()
        formData.append('file', data.file[0])
        formData.append('location', data.location)
        try {
            await apiCinemaCreate(formData)
            alert('Create success')
            e.target.reset()
        } catch (error) {
            alert('Create failure')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='admin-create-movie'>
            <div className='create-container'>
                <div className='title'>
                    Thêm rạp chiếu
                </div>
                <div className='form-control'>
                    <span>Vị trí</span>
                    <input {...register('location', { required: true })} type='text' />
                </div>
                <div className='form-control'>
                    <span>Hình ảnh</span>
                    <input {...register('file', { required: true })} type='file' />
                </div>
                <button type='submit'>
                    Thêm
                </button>
            </div>
        </form>
    );
}

export default CinemaCreate;