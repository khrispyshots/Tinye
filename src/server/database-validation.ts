export const categories = ["emergency", "laptop", "housing", "education", "travel", "custom"] as const;

function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Expected an object.");
  return value as Record<string, unknown>;
}

export function validateProfile(value: unknown) {
  const body = object(value);
  if (Object.keys(body).some(key => !["displayName", "preferences"].includes(key))) throw new Error("Unsupported profile field.");
  if (typeof body.displayName !== "string" || !body.displayName.trim() || body.displayName.trim().length > 60) throw new Error("Use a display name between 1 and 60 characters.");
  const preferences = object(body.preferences);
  if (Object.keys(preferences).some(key => !["notifications", "reducedMotion"].includes(key)) || typeof preferences.notifications !== "boolean" || typeof preferences.reducedMotion !== "boolean") throw new Error("Invalid preferences.");
  return { display_name: body.displayName.trim(), preferences: { notifications: preferences.notifications, reducedMotion: preferences.reducedMotion } };
}

export function validateGoalMetadata(value: unknown) {
  const body = object(value);
  if (Object.keys(body).some(key => !["goalId", "name", "category", "notes"].includes(key))) throw new Error("Unsupported goal metadata field.");
  if (typeof body.goalId !== "string" || !/^[a-zA-Z0-9_-]{1,64}$/.test(body.goalId)) throw new Error("Invalid goal ID.");
  if (typeof body.name !== "string" || !body.name.trim() || body.name.trim().length > 100) throw new Error("Goal names must contain 1–100 characters.");
  if (typeof body.category !== "string" || !(categories as readonly string[]).includes(body.category)) throw new Error("Invalid goal category.");
  if (body.notes !== undefined && (typeof body.notes !== "string" || body.notes.length > 1000)) throw new Error("Goal notes must be at most 1000 characters.");
  return { goal_id: body.goalId, name: body.name.trim(), category: body.category, notes: typeof body.notes === "string" ? body.notes : "" };
}
