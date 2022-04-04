import addRouteStyleNamespace from 'ember-cli-styles-namespace/utils/add-route-style-namespace';

export function initialize(appInstance) {
  const router = appInstance.lookup('service:router');

  router.on('routeDidChange', function ({ to }) {
    if (likeRouteInfo(to)) {
      addRouteStyleNamespace(appInstance, nestedRouteNames(to));
    }
  });

  router.on('routeWillChange', function ({ to, isActive }) {
    if (likeRouteInfo(to)) {
      if (/_loading$/.test(to.name) && isActive) {
        const routeNames = nestedRouteNames(to)
          // loading route names are set with an _loading even though
          // their path is -loading
          .map((name) => name.replace(/_loading$/, '-loading'));
        addRouteStyleNamespace(appInstance, routeNames);
      }
    }
  });
}

function nestedRouteNames({ name, parent }, routeNames = []) {
  routeNames.push(name);
  if (parent) {
    return nestedRouteNames(parent, routeNames);
  }
  return routeNames;
}

function likeRouteInfo(info) {
  return info && typeof info === 'object' && Object.prototype.hasOwnProperty.call(info, 'name');
}

export default {
  initialize,
  after: 'register-style-factories',
};
