import deleteIMG from '../../assets/delete.png'
import './Favorites.css'

export default function Favorites({ onFavorites, onSetFavorites, }) {
    console.log("======= favorites is rendering ======================")
    const handleDelete = (index) => {
        const newFavorites = [...onFavorites];
        newFavorites.splice(index, 1);
        onSetFavorites(newFavorites);
    }

    return (
        <>
            <h3 className='h3-favorites'>Favorites</h3>
            <div className='box-for-favorites'>
                <div className='header-exchange-box'>
                    <div className='exchange-amount'>A</div>
                    <div className='exchange-code'>T</div>
                    <div className='exchange-name'>From</div>
                    <div className='exchange-code'>T</div>
                    <div className='exchange-name'>To</div>
                    <div className='exchange-value'>Val</div>
                    <div className="exchange-delete">D</div>
                </div>
                {onFavorites !== null && onFavorites.map((item, index) => {
                    return (
                        <div className='single-exchange-box' key={index}>
                            <div className='exchange-amount'>{item.amount}</div>
                            <div className='exchange-code'>{item.form}</div>
                            <div className='exchange-name'>{item.label}</div>
                            <div className='exchange-code'>{item.form2}</div>
                            <div className='exchange-name'>{item.label2}</div>
                            <div className='exchange-value'>{item.exchange}</div>
                            <div className='exchange-delete'><img className="delete-img" onClick={() => { handleDelete(index) }} src={deleteIMG} alt="" /></div>
                        </div>
                    )
                })}
            </div>
            <div className="box-for-legend">
                <span>A - Amount</span>
                <span>T - Type</span>
                <span>Fx - forex</span>
                <span>St - stock</span>
                <span>Cr - Crypto</span>
                <span>Val - Value</span>
            </div>
        </>
    )
}