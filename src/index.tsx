import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

type AppProps = {}

type AppState = {
    members: string[];
    guests: string[];
    teams: Array<(string | undefined)[]>
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            members: [],
            guests: [],
            teams: []
        }
    }

    private async onGuestsChange(value: string) {
        const names = value.trim().split('\n').filter(Boolean)
        this.setState({
            ...this.state,
            guests: names,
        });
    }

    private async onMembersChange(value: string) {
        const names = value.trim().split('\n').filter(Boolean);

        this.setState({
            ...this.state,
            members: names,
        });
    }

    private generateTeams(): void {
        const teams = [];

        const members = this.state.members.slice();
        const guests = this.state.guests.slice();

        members.sort(() => 0.5 - Math.random());
        guests.sort(() => 0.5 - Math.random());

        while (members.length > 0) {
            const name1 = members.pop();
            const name2 = guests.shift();

            teams.push([name1, name2])
        }

        while (guests.length > 0) {
            const name1 = guests.pop();
            const name2 = guests.pop();

            teams.push([name1, name2])
        }

        this.setState({
            ...this.state,
            teams: teams,
        });
    }

    private renderTeams() {
        if (this.state.teams.length === 0) {
            return <></>
        }

        return (
            <>
                <table>
                    <tbody>
                    {this.state.teams.map((team: (string | undefined)[], index: number) => {
                            return (
                                <tr key={index}>
                                    <td className={this.isMember(team[0]) ? 'member' : 'guest'}>{team[0]}</td>
                                    {team[1] !== undefined ?
                                        <td className={this.isMember(team[1]) ? 'member' : 'guest'}>{team[1]}</td> :
                                        <td></td>}
                                </tr>
                            )
                        }
                    )}
                    </tbody>
                </table>
            </>
        )

    }

    private isMember(name?: string): boolean {
        return name === undefined ? false : this.state.members.includes(name);
    }

    public render() {
        return (
            <div className="wrapper">
                <div>
                    <div>
                        <h2>Guests</h2>
                        <textarea rows={10} name="guests" onChange={(event => this.onGuestsChange(event.target.value))}/>
                    </div>
                    <div>
                        <h2>Members</h2>
                        <textarea rows={10} name="members" onChange={(event => this.onMembersChange(event.target.value))}/>
                    </div>
                    <div>
                        <button onClick={() => this.generateTeams()}>Generate teams</button>
                    </div>
                </div>
                <div>
                    {this.renderTeams()}
                </div>
            </div>
        );
    }
}

(async () => {
    ReactDOM.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>,
        document.getElementById('root')
    );
})()

