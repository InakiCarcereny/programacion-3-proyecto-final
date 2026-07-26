import { Search } from "lucide-react";
import { useState, type JSX } from "react";
import { useAuth } from "../../context/AuthContext";

import "./Header.css";
import { useSearch } from "../../context/SearchContext";

export function Header(): JSX.Element {
  const { user } = useAuth();
  const { query, setQuery } = useSearch();
  const [focused, setFocused] = useState(false);

  const initials =
    `${user?.profile?.firstName?.[0] ?? ""}${user?.profile?.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <header className="header">
      <div
        className="input-container"
        style={{
          border: `1px solid ${focused ? "#004ac6" : "#ccc"}`,
          color: focused ? "#004ac6" : "#ccc",
        }}
      >
        <Search size={20} />

        <input
          id="search"
          name="search"
          className="input"
          type="text"
          placeholder="Buscar productos, categorias..."
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="user-container">
        {user?.profile?.avatarUrl ? (
          <img
            src={user.profile.avatarUrl}
            alt={`${user.profile.firstName} ${user.profile.lastName} avatar`}
            className="user-avatar"
          />
        ) : (
          <div className="user-avatar-fallback">{initials}</div>
        )}

        <div className="user-info">
          <span className="user-name">
            {user?.profile?.firstName} {user?.profile?.lastName}
          </span>

          <span className="user-role">{user?.role.toUpperCase()}</span>
        </div>
      </div>
    </header>
  );
}
