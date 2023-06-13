import { useTimer } from 'react-timer-hook';

export function Timer({ expiryTimestamp }) {
    const {
        seconds,
        minutes,
        hours,
        days,
    } = useTimer({ expiryTimestamp, onExpire: () => 21 });


    return (
        <div style={{ textAlign: 'center' }}>
            <h4 style={{color: "#000"}}>Time Remaining</h4>
            <div style={{ fontSize: '44px', marginBottom: "0.3em"}}>
                <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </div>
        </div>
    );
}