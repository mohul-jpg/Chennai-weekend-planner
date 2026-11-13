function ActivityCard({ activity, onAddToPlan, isSaved }) {
  const priceLabel = activity.price === 0 ? "Free" : `Rs. ${activity.price}`;

  return (
    <article className="activity-card">
      <img
        className="activity-image"
        src={activity.image}
        alt={`${activity.title} in Chennai`}
      />

      <div className="activity-card-body">
        <div className="card-topline">
          <span className="category-pill">{activity.category}</span>
          <span className="price-pill">{priceLabel}</span>
        </div>

        <div className="card-copy">
          <h3>{activity.title}</h3>
          <p className="location-text">{activity.area}, Chennai</p>
        </div>

        {isSaved ? (
          <p className="saved-indicator" role="status">
            Saved
          </p>
        ) : (
          <div
            className="card-actions"
            aria-label={`Add ${activity.title} to plan`}
          >
            <button
              className="day-button saturday-button"
              type="button"
              onClick={() => onAddToPlan(activity, "Saturday")}
            >
              Plan Saturday
            </button>

            <button
              className="day-button sunday-button"
              type="button"
              onClick={() => onAddToPlan(activity, "Sunday")}
            >
              Plan Sunday
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default ActivityCard;
