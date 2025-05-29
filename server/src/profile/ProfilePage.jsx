import "./Profile.css"
import Navigation from "./Navigation";
import Orders from "./Orders";

export default function ProfilePage()
{
    return (
        <div>
            <div id="grid">
                <div id='top-bar'>
                    <h1>Helow world</h1>
                </div>
                <div id="navigation">
                    <Navigation/>
                </div>
                <div id="content">
                    <Orders/>
                </div>
            </div>
        </div>
    );
}