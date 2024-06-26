import { ClosedModel, Model, OpenModel } from 'src/services/models';
import EasyIDB, { settings } from '../IDB';
import saveProviders from '../Providers/saveProviders';

export default async function saveModels(models: Model[]) {
  const db = await EasyIDB.getDB(settings.dbName, settings.dbVersion);

  const formattedModels = models.map((model) => {
    let settingsString;
    try {
      settingsString = JSON.stringify((model as OpenModel).advancedSettings);
    } catch (err) {
      settingsString = undefined;
    }

    return {
      id: model.id,
      name: model.name,
      model: (model as OpenModel).model,
      advancedSettings: settingsString,
      providerId: model.provider.id,
      createdAt: model.createdAt || Date.now(),
    };
  });

  const formattedProviders = models.map((model) => {
    return {
      id: model.provider.id,
      name: model.provider.name,
      type: model.provider.type,

      token: (model as ClosedModel).provider.token,
      url: (model as OpenModel).provider.url,
      isClosed: model.provider.isClosed,
      createdAt: model.provider.createdAt || Date.now(),
    };
  });

  await saveProviders(formattedProviders);

  const tx = db.db.transaction('models', 'readwrite');
  const store = tx.objectStore('models');

  for (const model of formattedModels) {
    store.put(model);
  }

  await tx.done;
}
