export default function Logo(props) {
    return <img {...props} alt='Pokémon' className='logo' src={process.env.PUBLIC_URL + '/logo.png'} />;
}
