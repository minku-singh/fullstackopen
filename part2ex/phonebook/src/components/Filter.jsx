const Filter = ({ text, onChange }) => {
  return (
    <form>
      <div>
        filter shown with:{" "}
        <input onChange={onChange} type="text" value={text} />
      </div>
    </form>
  );
};

export default Filter;
