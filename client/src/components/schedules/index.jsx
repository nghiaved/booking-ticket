import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addCart } from '../../redux/actions'
import { apiScheduleRead } from '../../services'
import { path } from '../../utils'

function Schedules({ addCart, isLoggedIn }) {
    const [schedules, setSchedules] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiScheduleRead()
        const data = res.data.schedule
        data.map(item => item.datetime
            = moment(item.datetime).format('DD/MM/YYYY h:mm A'))
        setSchedules(data)
    }

    return (
        <div className="list-schedules-wrapper">
            {schedules && schedules.map(item =>
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
                                    alert('Đã thêm vé vào giỏ hàng!')
                                } else {
                                    navigate(path.LOGIN)
                                }
                            }} className='cart'>Thêm</div>
                        </div>
                    </div>
                </div>)
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

export default connect(mapStateToProps, mapActionsToProps)(Schedules)
