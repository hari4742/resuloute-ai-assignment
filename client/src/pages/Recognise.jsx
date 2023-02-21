const Recognise = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="recognise">
      <form>
        <input type="file" name="img" id="image" />
        <input type="submit" value="Recognise" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default Recognise;
