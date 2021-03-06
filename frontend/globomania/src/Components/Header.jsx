const Header = ({ history }) => {
    const getBack = () => {
        history.push('/chat');
    }
    return (

        <header id="header">
            <div id="logo" onClick={getBack}>
                <svg id="logo__svg" data-name="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
                    <g id="_640fb903-7c97-3a8b-d0a7-369102908d0a" data-name="640fb903-7c97-3a8b-d0a7-369102908d0a">
                        <path class="logo" d="M150,250a99.66,99.66,0,1,0-70.81-29.19A99.31,99.31,0,0,0,150,250Zm5.74-17a45.93,45.93,0,0,1-5.74.24c-2.63,0-5.26-.24-7.89-.47A145.16,145.16,0,0,1,123.21,190h42.34a20.71,20.71,0,0,0,7.18,9.09A145.53,145.53,0,0,1,155.74,233Zm22.73-4.78a150.44,150.44,0,0,0,11-25.6A20.8,20.8,0,0,0,204.55,190H223A85.32,85.32,0,0,1,178.47,228.23ZM233,150a91.48,91.48,0,0,1-3.11,23H204.07a22,22,0,0,0-6.7-8.14q.72-7.89.72-15.79a166.85,166.85,0,0,0-1.44-22h33A73.24,73.24,0,0,1,233,150Zm-10-39.95H193.78A161,161,0,0,0,179.9,72.49,84.7,84.7,0,0,1,223,110.05Zm-41.63,39c0,4.07-.24,8.14-.48,12.2A20.72,20.72,0,0,0,166,173H119.86a166.34,166.34,0,0,1-1.68-21.77,129.83,129.83,0,0,1,.72-13.64A21.58,21.58,0,0,0,133.25,127H179.9a166.85,166.85,0,0,1,1.44,22ZM143.78,67.22A58.43,58.43,0,0,1,150,67c2.39,0,4.78,0,7.18.23a145.68,145.68,0,0,1,18.9,42.83H134.45A22.88,22.88,0,0,0,127,99.76a155.4,155.4,0,0,1,16.75-32.54ZM121.05,72a178.27,178.27,0,0,0-10.52,23.92,21.17,21.17,0,0,0-15.79,13.88H77.27A84.08,84.08,0,0,1,121.05,72ZM67,150a81,81,0,0,1,3.34-23H96.41a23.61,23.61,0,0,0,6,6.94c-.48,5.74-1,11.48-1,17.23A163.24,163.24,0,0,0,102.87,173H70.33A74.28,74.28,0,0,1,67,150Zm38.75,39.71a165.06,165.06,0,0,0,13.88,37.56A83.79,83.79,0,0,1,77,189.71Z"/>
                    </g>
                </svg>
            </div>
            <div id="curv-text">
            <svg id="curv-text__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
                <path className="curv-text" d="M150,41A109,109,0,1,1,41,150,109,109,0,0,1,150,41m0-36.66A145.69,145.69,0,0,0,93.29,284.2,145.69,145.69,0,0,0,206.71,15.8,144.69,144.69,0,0,0,150,4.34Z"/>
                <text className="cls-2" transform="translate(65.92 70.48) rotate(-40.19)">G</text>
                <text className="cls-2" transform="translate(85.41 54.74) rotate(-32.01)">l</text>
                <text className="cls-2" transform="matrix(0.9, -0.43, 0.43, 0.9, 92.08, 50.14)">o</text>
                <text className="cls-2" transform="translate(109.13 41.99) rotate(-15.64)">b</text>
                <text className="cls-2" transform="translate(128.06 36.66) rotate(-5.96)">o</text>
                <text className="cls-2" transform="matrix(1, 0.1, -0.1, 1, 146.56, 34.07)">m</text>
                <text className="cls-2" transform="translate(175.51 37.45) rotate(17.39)">a</text>
                <text className="cls-2" transform="translate(192.47 42.63) rotate(26.59)">n</text>
                <text className="cls-2" transform="translate(209.55 51.5) rotate(33.4)">i</text>
                <text className="cls-2" transform="translate(216.53 55.72) rotate(39.87)">a</text>
            </svg>
            </div>
        </header>
    )
} 

export default Header;