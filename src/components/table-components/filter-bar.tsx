
interface Props {
  setFilter: (s: string) => void
}

export default function FilterBar({ setFilter }: Props){

  const bounce = (filter: string) => {
    setFilter(filter);
  }

  return (
    <>
      <input className="filter-symbol" placeholder="filter symbols" onChange={ e => bounce(e.target.value)}/>
    </>
    
  );
}