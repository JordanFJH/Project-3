

function GuestHomePage(props) {
    return (
        <div className="guest-home-main">
            <section className="flex flex-col items-center bg-purple-300">
                <h1>This is the Media Progress Tracker Site</h1>
                <h3>Please sign in to start tracking your media progress</h3>
                <h3>
                    This site was designed to try to help you keep track of all the media that
                    you may try to consume.  Simply sign in or register, search for content to consume, and begin saving different types of media
                    to your account to keep track of.
                </h3>
                <div className="w-1/4 h-1/4">
                    <img src="public\img\pacman_eating.gif" alt="pic of pacman eating" className="w-full"/>
                </div>
            </section>
        </div>
    );
}

export default GuestHomePage;