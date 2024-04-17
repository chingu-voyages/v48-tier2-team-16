import React from "react";
import MultiRangeSlider from "multi-range-slider-react";

export default function SearchForm({ handleChange, formData }) {
  return (
    <div
      className="aside col-md-12 pb-4 pt-2"
      style={{ background: "#003f62" }}
    >
      <form className="container mt-4 text-white">
        <div className="row">
          <div
            className="col-7"
            style={{ fontFamily: "Sigmar One, sans-serif" }}
          >
            <h4>Find your favourite dinosaur!</h4>
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

        <label
          htmlFor="dino-name"
          style={{ fontFamily: "Ramla, sans-serif", fontWeight: "400" }}
        >
          Name
        </label>
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
        <label
          htmlFor="country"
          style={{ fontFamily: "Ramla, sans-serif", fontWeight: "400" }}
        >
          Country
        </label>

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

        <label
          htmlFor="diet"
          style={{ fontFamily: "Ramla, sans-serif", fontWeight: "400" }}
        >
          Diet
        </label>
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

        <div className="d-flex justify-content-between">
          <label
            className="form-label"
            style={{ fontFamily: "Ramla, sans-serif" }}
          >
            Minimum weight: {formData.weightMin} kilograms
          </label>

          <label
            className="form-label"
            style={{ fontFamily: "Ramla, sans-serif" }}
          >
            Maximum weight: {formData.weightMax} kilograms
          </label>
        </div>
        <MultiRangeSlider
          style={{ border: "none", boxShadow: "none", padding: "15px 10px" }}
          label="true"
          ruler="false"
          name="weightMin"
          canMinMaxValueSame={true}
          min="0"
          max="70000"
          step="500"
          minValue={formData.weightMin}
          maxValue={formData.weightMax}
          onChange={(e) => {
            let name = "weightMin";
            let value = e.minValue;
            if (formData.weightMax != e.maxValue) {
              name = "weightMax";
              value = e.maxValue;
            }
            handleChange({
              target: {
                name,
                value,
              },
            });
          }}
        />
        <br />
        {/************************ LENGTH SLIDERS ******************************/}
        <div className="d-flex justify-content-between">
          <label
            className="form-label"
            style={{ fontFamily: "Ramla, sans-serif" }}
          >
            Minimum length: {formData.lengthMin} meters
          </label>

          <label
            className="form-label"
            style={{ fontFamily: "Ramla, sans-serif" }}
          >
            Maximum length: {formData.lengthMax} meters
          </label>
        </div>
        <MultiRangeSlider
          style={{ border: "none", boxShadow: "none", padding: "15px 10px" }}
          label="true"
          ruler="false"
          name="lengthMin"
          canMinMaxValueSame={true}
          min="0"
          max="40"
          step="1"
          minValue={formData.lengthMin}
          maxValue={formData.lengthMax}
          onChange={(e) => {
            let name = "lengthMin";
            let value = e.minValue;
            if (formData.lengthMax != e.maxValue) {
              name = "lengthMax";
              value = e.maxValue;
            }
            handleChange({
              target: {
                name,
                value,
              },
            });
          }}
        />
      </form>
    </div>
  );
}
