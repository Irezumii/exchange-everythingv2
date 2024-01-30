import './History.css'

export default function History({ onHistory, onSetHistory, }) {
    function handleClear(){
        onSetHistory(null)
    }
    console.log(onHistory, "HISOTRYYYYYYYYYYYYYYYYYYYYYY")
    return (
        <>
            <div className='box-for-history'>
                <div className='header-exchange-box-history'>
                    <div className='exchange-amount-history-header'>A</div>
                    <div className='exchange-code-history-header'>Code</div>
                    <div className='exchange-code-history-header'>Code</div>
                    <div className='exchange-value-history-header'>Val</div>
                </div>
                {onHistory !== null && onHistory.map((item, index) => {
                    if(item !== undefined){
                        return (
                            <div className='single-exchange-box-history' key={"history" + index}>
                                <div className='exchange-amount-history'>{item.amount}</div>
                                <div className='exchange-code-history'>{item.name}</div>
                                <div className='exchange-code-history'>{item.name2}</div>
                                <div className='exchange-value-history'>{item.exchange}</div>
                            </div>
                        )
                    }
                })}
            </div>
                <div className="box-for-history-legend">
                    <span onClick={handleClear}>Clear History</span>
                </div>
        </>
    )
}