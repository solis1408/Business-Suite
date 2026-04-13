(function () {
  function normalizePath(path) {
    var normalized = path || "/";
    normalized = normalized.replace(/index\.html$/, "");
    if (!normalized.endsWith("/")) {
      normalized += "/";
    }
    return normalized;
  }

  function isDesktopNav() {
    return window.matchMedia("(min-width: 76.1875em)").matches;
  }

  function getLabel(node) {
    var ellipsis = node.querySelector(":scope > .md-nav__link .md-ellipsis, :scope > .md-nav__container > .md-nav__link .md-ellipsis, :scope > label .md-ellipsis");
    return ellipsis ? ellipsis.textContent.trim() : "";
  }

  function getDirectLink(node) {
    return node.querySelector(":scope > a.md-nav__link, :scope > .md-nav__container > a.md-nav__link");
  }

  function getChildItems(node) {
    return Array.from(node.querySelectorAll(":scope > nav.md-nav:not(.md-nav--secondary) > ul > li.md-nav__item"));
  }

  function markActive(link, currentPath, className) {
    if (!link) {
      return false;
    }

    var href = link.getAttribute("href") || "";
    var absolute = new URL(href, window.location.href);
    var isActive = normalizePath(absolute.pathname) === currentPath;
    if (isActive) {
      link.classList.add(className);
    }
    return isActive;
  }

  function createLeaf(node, currentPath) {
    var sourceLink = getDirectLink(node);
    if (!sourceLink) {
      return null;
    }

    var link = document.createElement("a");
    link.className = "bs-main-nav__leaf";
    link.href = sourceLink.href;
    link.textContent = getLabel(node);
    markActive(link, currentPath, "bs-main-nav__leaf--active");
    return link;
  }

  function createSubtree(node, currentPath, level) {
    var label = getLabel(node);
    var sourceLink = getDirectLink(node);
    var childItems = getChildItems(node);

    if (!childItems.length) {
      return createLeaf(node, currentPath);
    }

    var details = document.createElement("details");
    details.className = level === 0 ? "bs-main-nav__details" : "bs-main-nav__subdetails";

    var summary = document.createElement("summary");
    summary.className = level === 0 ? "bs-main-nav__summary" : "bs-main-nav__subsummary";
    summary.textContent = label;
    details.appendChild(summary);

    var content = document.createElement("div");
    content.className = level === 0 ? "bs-main-nav__content" : "bs-main-nav__subcontent";

    var list = document.createElement("ul");
    list.className = "bs-main-nav__sublist";

    var hasActiveDescendant = false;

    if (sourceLink && !/^(Inicio)$/i.test(label)) {
      var directItem = document.createElement("li");
      directItem.className = "bs-main-nav__subitem";
      var directLink = document.createElement("a");
      directLink.className = level === 0 ? "bs-main-nav__link" : "bs-main-nav__sublink";
      directLink.href = sourceLink.href;
      directLink.textContent = "Inicio";
      if (markActive(directLink, currentPath, level === 0 ? "bs-main-nav__link--active" : "bs-main-nav__sublink--active")) {
        hasActiveDescendant = true;
      }
      directItem.appendChild(directLink);
      list.appendChild(directItem);
    }

    childItems.forEach(function (childNode) {
      var item = document.createElement("li");
      item.className = "bs-main-nav__subitem";
      var childTree = createSubtree(childNode, currentPath, level + 1);
      if (!childTree) {
        return;
      }
      if (childTree.matches("details[open]")) {
        hasActiveDescendant = true;
      }
      if (childTree.matches("a.bs-main-nav__leaf--active, a.bs-main-nav__link--active, a.bs-main-nav__sublink--active")) {
        hasActiveDescendant = true;
      }
      item.appendChild(childTree);
      list.appendChild(item);
    });

    content.appendChild(list);
    details.appendChild(content);

    if (hasActiveDescendant) {
      details.classList.add("bs-main-nav__details--active");
      if (level > 0) {
        details.open = true;
      }
    }

    return details;
  }

  function setupMainNavInteractions(container) {
    var topLevelDetails = Array.from(container.querySelectorAll(".bs-main-nav__item > .bs-main-nav__details"));
    var searchToggle = document.querySelector("#__search");

    function closeInactiveMenus() {
      topLevelDetails.forEach(function (details) {
        if (!details.classList.contains("bs-main-nav__details--active")) {
          details.open = false;
        }
      });
    }

    function closeOtherMenus(current) {
      topLevelDetails.forEach(function (other) {
        if (other !== current) {
          other.open = false;
        }
      });
    }

    function getSearchRoot() {
      return document.querySelector('[data-md-component="search"]');
    }

    function getSearchInput() {
      var root = getSearchRoot();
      return root ? root.querySelector("input.md-search__input") : null;
    }

    function getSearchResults() {
      return document.querySelector(".md-search-result__list");
    }

    function setSearchActive(active) {
      container.classList.toggle("bs-main-nav--search-active", !!active);

      if (active) {
        topLevelDetails.forEach(function (details) {
          details.open = false;
        });
      }
    }

    function syncSearchState() {
      var searchRoot = getSearchRoot();
      var searchInput = getSearchInput();
      var searchResults = getSearchResults();
      var hasVisibleResults = !!(searchResults && searchResults.children.length > 0);
      var hasSearchFocus = !!(searchRoot && searchRoot.contains(document.activeElement));
      var hasSearchText = !!(searchInput && (searchInput.value || "").trim().length > 0);
      var searchActive = !!((searchToggle && searchToggle.checked) || hasSearchFocus || hasSearchText || hasVisibleResults);

      setSearchActive(searchActive);
    }

    topLevelDetails.forEach(function (details) {
      details.addEventListener("toggle", function () {
        if (!details.open) {
          return;
        }

        closeOtherMenus(details);
      });

      details.addEventListener("mouseenter", function () {
        if (!isDesktopNav()) {
          return;
        }

        details.open = true;
        closeOtherMenus(details);
      });

      details.addEventListener("mouseleave", function () {
        if (!isDesktopNav() || details.classList.contains("bs-main-nav__details--active")) {
          return;
        }

        details.open = false;
      });
    });

    document.addEventListener("click", function (event) {
      if (container.contains(event.target)) {
        return;
      }

      closeInactiveMenus();
    });

    window.addEventListener("resize", function () {
      if (isDesktopNav()) {
        closeInactiveMenus();
      }
    });

    if (searchToggle) {
      searchToggle.addEventListener("change", syncSearchState);
    }

    document.addEventListener("focusin", function (event) {
      if (event.target.closest('[data-md-component="search"]')) {
        setSearchActive(true);
      }
    });

    document.addEventListener("focusout", function () {
      window.setTimeout(syncSearchState, 0);
    });

    document.addEventListener("input", function (event) {
      if (event.target.matches("input.md-search__input")) {
        syncSearchState();
      }
    });

    document.addEventListener("click", function (event) {
      if (event.target.closest('[data-md-component="search"]')) {
        setSearchActive(true);
        return;
      }

      if (event.target.closest('.md-search__overlay, button[title="Limpiar"], button[aria-label="Limpiar"]')) {
        window.setTimeout(syncSearchState, 0);
      }
    });

    var resultsObserver = new MutationObserver(syncSearchState);
    var resultsList = getSearchResults();
    if (resultsList) {
      resultsObserver.observe(resultsList, { childList: true, subtree: false });
    }

    syncSearchState();
  }

  function buildMainNav() {
    var existing = document.querySelector(".bs-main-nav");
    if (existing) {
      existing.remove();
    }

    var primaryList = document.querySelector(".md-nav--primary > .md-nav__list");
    var header = document.querySelector(".md-header");
    if (!primaryList || !header) {
      return;
    }

    var currentPath = normalizePath(window.location.pathname);
    var rootItems = Array.from(primaryList.children).filter(function (item) {
      return item.matches("li.md-nav__item");
    });

    var container = document.createElement("section");
    container.className = "bs-main-nav";
    container.setAttribute("aria-label", "Menú principal colapsable");

    var inner = document.createElement("div");
    inner.className = "bs-main-nav__inner md-grid";

    var list = document.createElement("ul");
    list.className = "bs-main-nav__list";

    rootItems.forEach(function (rootNode) {
      var item = document.createElement("li");
      item.className = "bs-main-nav__item";
      var tree = createSubtree(rootNode, currentPath, 0);
      if (!tree) {
        return;
      }
      item.appendChild(tree);
      list.appendChild(item);
    });

    inner.appendChild(list);
    container.appendChild(inner);
    header.insertAdjacentElement("afterend", container);
    setupMainNavInteractions(container);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildMainNav);
  } else {
    buildMainNav();
  }
})();