import deleteIMG from '../../assets/delete.png'

export default function Favorites({ onFavorites, onSetFavorites,}) {
    console.log("======= favorites is rendering ======================")
    const handleDelete = (index) => {
        const newFavorites = [...onFavorites];
        newFavorites.splice(index, 1); 
        onSetFavorites(newFavorites);
    }

    return (
        <>
            <h3>Favorites</h3>
            { onFavorites !== null && <div className='box-for-favorites'>
                <div className='header-exchange-box'>
                    <div className='exchange-amount'>Amount</div>
                    <div className='exchange-code'>Type</div>
                    <div className='exchange-name'>From</div>
                    <div className='exchange-code'>Type</div>
                    <div className='exchange-name'>To</div>
                    <div className='exchange-value'>Value</div>
                </div>
                {onFavorites.map((item, index) => {
                    return (
                        <div className='single-exchange-box' key={index}>
                            <div className='exchange-amount'>{item.amount}</div>
                            <div className='exchange-code'>{item.form}</div>
                            <div className='exchange-name'>{item.label}</div>
                            <div className='exchange-code'>{item.form2}</div>
                            <div className='exchange-name'>{item.label2}</div>
                            <div className='exchange-value'>{item.exchange}</div>
                            <img className="delete-img" onClick={() => { handleDelete(index) }} src={deleteIMG} alt="" />
                        </div>
                    )
                })}
            </div>}
        </>
    )
}