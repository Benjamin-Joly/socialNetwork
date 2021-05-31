const Exit = () => {
    const handleLogOut = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        window.location.pathname = "/auth"
    };
    return (
        <button id='exit' onClick={handleLogOut}>Exit</button>
    )
}

export default Exit;