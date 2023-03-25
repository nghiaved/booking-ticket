import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { path } from '../../utils'
import { addCart, deleteCart } from '../../redux/actions'
import { apiScheduleRemaining } from '../../services'

function Cart({ cart, addCart, deleteCart }) {
    return (
        <div className="list-schedules-wrapper">
            {cart && cart.length > 0 ? cart.map(item =>
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
                            <h4>
                                {item.quantity ? <span>x{item.quantity}</span> : 'x1'}
                            </h4>
                        </div>
                        <div className="feature">
                            <div onClick={() => {
                                addCart(item)
                                item.remaining = item.remaining - 1
                                apiScheduleRemaining(item)
                            }} className='cart'>Thêm</div>
                            <div onClick={() => {
                                alert('Thanh toán!')
                            }} className='cart'>Thanh toán</div>
                            <button onClick={() => {
                                if (window.confirm("Xóa vĩnh viễn?")) {
                                    deleteCart(item)
                                    item.remaining = item.number
                                    apiScheduleRemaining(item)
                                }
                            }}>
                                <i className='fas fa-trash'></i>
                            </button>
                        </div>
                    </div>
                </div>) :
                <div className='exist'>
                    Vỏ hàng trống
                    <Link to={`/${path.SCHEDULES}`}>Mua vé</Link>
                </div>
            }
        </div>
    );
}

const mapStateToProps = state => ({
    cart: state.cart.cartAt
})

const mapActionsToProps = {
    addCart,
    deleteCart
}

export default connect(mapStateToProps, mapActionsToProps)(Cart)
