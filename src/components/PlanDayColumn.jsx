import { useState } from "react";

function PlanDayColumn({ day, activities, onToggleVisited, onRemove, onNoteChange }) {
  const [pendingRemovalId, setPendingRemovalId] = useState(null);

  return (
    <section className="plan-day-column">
      <div className="day-heading">
        <h3>{day}</h3>
        <span>{activities.length}</span>
      </div>

      {activities.length === 0 ? (
        <p className="day-empty">No activities planned for {day}.</p>
      ) : (
        <ul className="plan-list">
          {activities.map((activity) => (
            <li
              className={`plan-item ${activity.visited ? "is-visited" : ""}`}
              key={activity.id}
            >
              <div className="plan-item-copy">
                <h4>{activity.title}</h4>
                <p>{activity.area}</p>
                <span className="status-text">
                  {activity.visited ? "Visited" : "Not visited yet"}
                </span>
              </div>

              <div className="plan-actions">
                <button
                  className="status-button"
                  type="button"
                  onClick={() => onToggleVisited(activity.id)}
                >
                  {activity.visited ? "Undo visited" : "Mark visited"}
                </button>
                <label className="note-field">
                  <span>Plan note</span>

                  <textarea
                    aria-label={`Plan note for ${activity.title}`}
                    value={activity.note}
                    placeholder="Example: Reach before 9 AM"
                    onChange={(event) =>
                      onNoteChange(activity.id, event.target.value)
                    }
                  />
                </label>
                <button
                  className="remove-button"
                  type="button"
                  onClick={() => setPendingRemovalId(activity.id)}
                >
                  Remove
                </button>

                {pendingRemovalId === activity.id && (
                  <div className="remove-confirmation" role="alert">
                    <span>Remove {activity.title}?</span>
                    <button
                      className="confirm-remove-button"
                      type="button"
                      onClick={() => {
                        onRemove(activity.id);
                        setPendingRemovalId(null);
                      }}
                    >
                      Yes, remove
                    </button>
                    <button
                      className="cancel-remove-button"
                      type="button"
                      onClick={() => setPendingRemovalId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default PlanDayColumn;
