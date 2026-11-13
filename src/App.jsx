import { useEffect, useState } from "react";
import "./App.css";
import { activities } from "./data/activities";
import ActivityCard from "./components/ActivityCard";
import PlanDayColumn from "./components/PlanDayColumn";
import CustomActivityForm from "./components/CustomActivityForm";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [weekendPlan, setWeekendPlan] = useState(() => {
  const savedPlan = localStorage.getItem("weekendPlan");

  return savedPlan ? JSON.parse(savedPlan) : [];
});
  useEffect(() => {
    localStorage.setItem("weekendPlan", JSON.stringify(weekendPlan));
  }, [weekendPlan]);

  function handleAddToPlan(activity, plannedDay) {
    setWeekendPlan((currentPlan) => {
      const isAlreadyAdded = currentPlan.some(
        (plannedActivity) => plannedActivity.id === activity.id,
      );

      if (isAlreadyAdded) {
        return currentPlan;
      }

      return [
        ...currentPlan,
        {
          ...activity,
          plannedDay,
          visited: false,
          note: "",
        },
      ];
    });
  }

  function handleRemoveFromPlan(activityId) {
    setWeekendPlan((currentPlan) =>
      currentPlan.filter((activity) => activity.id !== activityId),
    );
  }

  function handleToggleVisited(activityId) {
    setWeekendPlan((currentPlan) =>
      currentPlan.map((activity) =>
        activity.id === activityId
          ? { ...activity, visited: !activity.visited }
          : activity,
      ),
    );
  }
  function handleNoteChange(activityId, newNote) {
    setWeekendPlan((currentPlan) =>
      currentPlan.map((activity) =>
        activity.id === activityId ? { ...activity, note: newNote } : activity,
      ),
    );
  }

  function handleResetFilters() {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortOption("default");
  }

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || activity.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
  const sortedActivities = [...filteredActivities].sort((first, second) => {
    if (sortOption === "price-low") {
      return first.price - second.price;
    }

    if (sortOption === "price-high") {
      return second.price - first.price;
    }

    if (sortOption === "title") {
      return first.title.localeCompare(second.title);
    }

    return 0;
  });

  const saturdayPlan = weekendPlan.filter(
    (activity) => activity.plannedDay === "Saturday",
  );
  const sundayPlan = weekendPlan.filter(
    (activity) => activity.plannedDay === "Sunday",
  );
  const totalCost = weekendPlan.reduce(
    (total, activity) => total + activity.price,
    0,
  );
  const visitedCount = weekendPlan.filter(
    (activity) => activity.visited,
  ).length;

  return (
    <main className="app-shell">
      <header className="hero">
        <p className="eyebrow">Curated for curious weekends</p>
        <h1>Chennai Weekend Planner</h1>
        <p className="hero-copy">
          Find a local experience, choose your day, and keep your whole weekend
          in one simple plan.
        </p>
      </header>

      <section className="filters-panel" aria-label="Activity filters">
        <div className="search-field">
          <label htmlFor="activity-search">What do you feel like doing?</label>
          <input
            id="activity-search"
            type="search"
            placeholder="Try museum, beach, food..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="filter-actions">
          <div className="filter-field">
            <label htmlFor="category-filter">Category</label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Culture">Culture</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Food">Food</option>
            </select>
          </div>

          <div className="filter-field">
            <label htmlFor="sort-option">Sort by</label>
            <select
              id="sort-option"
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
            >
              <option value="default">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="title">Title: A-Z</option>
            </select>
          </div>

          <button
            className="reset-button"
            type="button"
            onClick={handleResetFilters}
          >
            Reset
          </button>
        </div>
      </section>

      <CustomActivityForm onAddActivity={handleAddToPlan} />

      <section className="discovery-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Discover Chennai</p>
            <h2>Pick your next experience</h2>
          </div>
          <span className="selection-count">{weekendPlan.length} selected</span>
        </div>

        {filteredActivities.length > 0 ? (
          <div className="activity-list">
            {sortedActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onAddToPlan={handleAddToPlan}
                isSaved={weekendPlan.some(
                  (plannedActivity) => plannedActivity.id === activity.id,
                )}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No activities found</h3>
            <p>Try another search word or reset the category filter.</p>
          </div>
        )}
      </section>

      <section className="weekend-plan">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Your itinerary</p>
            <h2>My Weekend Plan</h2>

            <div className="plan-summary">
              <div className="summary-card">
                <span>Total cost</span>
                <strong>Rs. {totalCost}</strong>
              </div>

              <div className="summary-card">
                <span>Visited</span>
                <strong>
                  {visitedCount} / {weekendPlan.length}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {weekendPlan.length === 0 ? (
          <div className="plan-empty">
            <p>Your plan is waiting for its first Chennai experience.</p>
          </div>
        ) : (
          <div className="plan-columns">
            <PlanDayColumn
              day="Saturday"
              activities={saturdayPlan}
              onToggleVisited={handleToggleVisited}
              onRemove={handleRemoveFromPlan}
              onNoteChange={handleNoteChange}
            />

            <PlanDayColumn
              day="Sunday"
              activities={sundayPlan}
              onToggleVisited={handleToggleVisited}
              onRemove={handleRemoveFromPlan}
              onNoteChange={handleNoteChange}
            />
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
