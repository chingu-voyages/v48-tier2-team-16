import React from "react";

export default function SearchForm({ handleChange, formData }) {
  return (
    <form className="container mt-4">
      <div className="row">
        <div className="col-7">
          <h4>Search Dinosaurs:</h4>
        </div>
        <div className="col-5">
          <select
            name="sortBy"
            onChange={handleChange}
            id="sortBy"
            className="form-select"
            value={formData.sortBy}
          >
            <option value="name">Sort by: Name</option>
            <option value="country">Sort by: Country</option>
            <option value="diet">Sort by: Diet</option>
            <option value="lengthAsc">Sort by: Length: Low to High</option>
            <option value="lengthDesc">Sort by: Length: High to Low</option>
            <option value="weightAsc">Sort by: Weight: Low to High</option>
            <option value="weightDesc">Sort by: Weight: High to Low</option>
          </select>
        </div>
      </div>

      <label htmlFor="dino-name">Dinosaur Name</label>
      <div className="input-group mb-3">
        <input
          className="form-control"
          type="text"
          placeholder="Enter name"
          name="dinoName"
          onChange={handleChange}
          id="dino-name"
          value={formData.dinoName}
        />
      </div>
      <label htmlFor="country">Found In</label>

      <div className="input-group mb-3">
        <input
          className="form-control"
          list="countries"
          name="country"
          id="country"
          placeholder="Select country"
          onChange={handleChange}
          value={formData.country}
        />
      </div>
      <datalist id="countries">
        <option value="Algeria"></option>
        <option value="Antarctica"></option>
        <option value="Argentina"></option>
        <option value="Australia"></option>
        <option value="Austria"></option>
        <option value="Belgium"></option>
        <option value="Brazil"></option>
        <option value="Canada"></option>
        <option value="Chile"></option>
        <option value="China"></option>
        <option value="Egypt"></option>
        <option value="England"></option>
        <option value="France"></option>
        <option value="Germany"></option>
        <option value="India"></option>
        <option value="Japan"></option>
        <option value="Kazakhstan"></option>
        <option value="Lesotho"></option>
        <option value="Madagascar"></option>
        <option value="Malawi"></option>
        <option value="Mongolia"></option>
        <option value="Morocco"></option>
        <option value="Niger"></option>
        <option value="North Africa"></option>
        <option value="Portugal"></option>
        <option value="Romania"></option>
        <option value="Russia"></option>
        <option value="Scotland"></option>
        <option value="South Africa"></option>
        <option value="Spain"></option>
        <option value="Switzerland"></option>
        <option value="Tanzania"></option>
        <option value="Tunisia"></option>
        <option value="United Kingdom"></option>
        <option value="Uruguay"></option>
        <option value="USA"></option>
        <option value="Uzbekistan"></option>
        <option value="Wales"></option>
        <option value="Zimbabwe"></option>
      </datalist>

      <label htmlFor="diet">Diet</label>
      <div className="input-group mb-3">
        <input
          className="form-control"
          list="diets"
          placeholder="Select diet"
          name="diet"
          onChange={handleChange}
          id="diet"
          value={formData.diet}
        />
      </div>
      <datalist id="diets">
        <option value="omnivorous"></option>
        <option value="herbivorous"></option>
        <option value="carnivorous"></option>
      </datalist>

      {/************************ WEIGHT SLIDERS ******************************/}

      <label className="form-label" htmlFor="weight-max">
        Choose a maximum weight: {formData.weightMax} kilograms
      </label>

      <input
        className="form-range"
        type="range"
        name="weightMax"
        id="weight-max"
        min="0"
        max="70000"
        step="500"
        value={formData.weightMax}
        onChange={handleChange}
      />

      <label htmlFor="weight-min">
        Choose a minimum weight: {formData.weightMin} kilograms
      </label>

      <input
        className="form-range"
        type="range"
        name="weightMin"
        id="weight-min"
        min="0"
        max="70000"
        step="500"
        value={formData.weightMin}
        onChange={handleChange}
      />

      {/************************ LENGTH SLIDERS ******************************/}

      <label className="form-label" htmlFor="weight-max">
        Choose a maximum length: {formData.lengthMax} meters
      </label>

      <input
        className="form-range"
        type="range"
        name="lengthMax"
        id="length-max"
        min="0"
        max="40"
        step="1"
        value={formData.lengthMax}
        onChange={handleChange}
      />

      <label className="form-label" htmlFor="length-min">
        Choose a minimum length: {formData.lengthMin} meters
      </label>

      <input
        className="form-range"
        type="range"
        name="lengthMin"
        id="length-min"
        min="0"
        max="40"
        step="1"
        value={formData.lengthMin}
        onChange={handleChange}
      />
    </form>
  );
}
