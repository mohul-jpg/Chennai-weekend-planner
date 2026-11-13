import { useState } from "react";

const initialForm = {
  title: "",
  area: "",
  category: "Culture",
  price: "",
  plannedDay: "Saturday",
};

function CustomActivityForm({ onAddActivity }) {
  const [formData, setFormData] = useState(initialForm);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newActivity = {
      id: `custom-${Date.now()}`,
      title: formData.title.trim(),
      area: formData.area.trim(),
      category: formData.category,
      price: Number(formData.price) || 0,
    };

    onAddActivity(newActivity, formData.plannedDay);
    setFormData(initialForm);
  }

  return (
    <section className="custom-activity-section" aria-labelledby="custom-title">
      <div>
        <p className="section-kicker">Create your own</p>
        <h2 id="custom-title">Add a custom activity</h2>
      </div>

      <form className="custom-activity-form" onSubmit={handleSubmit}>
        <label>
          Activity name
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Example: Bookstore visit"
            required
          />
        </label>

        <label>
          Area
          <input
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="Example: Adyar"
            required
          />
        </label>

        <label>
          Category
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Culture">Culture</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Food">Food</option>
          </select>
        </label>

        <label>
          Price
          <input
            name="price"
            type="number"
            min="0"
            value={formData.price}
            onChange={handleChange}
            placeholder="0"
          />
        </label>

        <label>
          Day
          <select
            name="plannedDay"
            value={formData.plannedDay}
            onChange={handleChange}
          >
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </label>

        <button className="add-custom-button" type="submit">
          Add to my plan
        </button>
      </form>
    </section>
  );
}

export default CustomActivityForm;
