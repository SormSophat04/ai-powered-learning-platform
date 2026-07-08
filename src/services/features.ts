import api from './api';

export interface FeatureData {
  iconName: string;
  title: string;
  description: string;
}

export const featureService = {
  getFeatures: () =>
    api.get<FeatureData[]>('/api/features').then(r => r.data),
};
