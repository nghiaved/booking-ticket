import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addCart } from '../../redux/actions'
import { apiScheduleSearchCinemas, apiScheduleRemaining } from '../../services'
import { path } from '../../utils'

function CinemasDetail({ addCart, isLoggedIn }) {
    const [schedules, setSchedules] = useState([])

    const navigate = useNavigate()

    const location = useLocation()
    const _id = location.state

    useEffect(() => {
        fetchData(_id)
    }, [_id, schedules])

    const fetchData = async id => {
        const res = await apiScheduleSearchCinemas(id)
        const data = res.data.schedules
        data.map(item => item.datetime
            = moment(item.datetime).format('MM/DD/YYYY h:mm A'))
        setSchedules(data)
    }

    return (
        <div className="list-schedules-wrapper">
            {schedules && schedules.length > 0 ? schedules.map(item =>
                <div key={item._id} className="item-card">
                    <div className="item">
                        <div className="row">
                            Phim:
                            <h5>
                                {item.movie.title}
                            </h5>
                        </div>
                        <div className="row">
                            Rạp:
                            <h5>
                                {item.cinema.location}
                            </h5>
                        </div>
                        <div className="row">
                            Thời gian:
                            <h5>
                                {item.datetime}
                            </h5>
                        </div>
                        <div className="row">
                            Số vé:
                            <h5>
                                {item.remaining} / {item.number}
                            </h5>
                        </div>
                        <div className="feature">
                            <div onClick={() => {
                                if (isLoggedIn) {
                                    addCart(item)
                                    item.remaining = item.remaining - 1
                                    apiScheduleRemaining(item)
                                    alert('Đã thêm vé vào giỏ hàng!')
                                } else {
                                    navigate(path.LOGIN)
                                }
                            }} className='cart'>Thêm</div>
                        </div>
                    </div>
                </div>) :
                <div className='exist'>Hiện tại chưa có xuất chiếu</div>
            }
        </div>
    );
}


const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn
})

const mapActionsToProps = {
    addCart
}

export default connect(mapStateToProps, mapActionsToProps)(CinemasDetail)
