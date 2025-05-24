'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Switch } from '@headlessui/react'

const settings = {
  notifications: [
    {
      id: 'new-conversations',
      name: 'New conversations',
      description: 'Get notified when new conversations are started',
      enabled: true,
    },
    {
      id: 'mentions',
      name: 'Mentions',
      description: 'Get notified when you are mentioned in a conversation',
      enabled: true,
    },
    {
      id: 'updates',
      name: 'Product updates',
      description: 'Get notified about new features and updates',
      enabled: false,
    },
  ],
  appearance: [
    {
      id: 'dark-mode',
      name: 'Dark mode',
      description: 'Switch between light and dark mode',
      enabled: false,
    },
    {
      id: 'compact-view',
      name: 'Compact view',
      description: 'Use a more compact layout for conversations',
      enabled: true,
    },
  ],
  integrations: [
    {
      id: 'slack',
      name: 'Slack',
      description: 'Connect your Slack workspace',
      enabled: true,
    },
    {
      id: 'email',
      name: 'Email',
      description: 'Set up email notifications',
      enabled: true,
    },
    {
      id: 'webhook',
      name: 'Webhooks',
      description: 'Configure webhook endpoints',
      enabled: false,
    },
  ],
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage your account settings and preferences.
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          {/* Notifications */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-base font-semibold leading-6 text-gray-900">Notifications</h3>
              <div className="mt-6 space-y-6">
                {settings.notifications.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between">
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-900">{setting.name}</p>
                      <p className="text-sm text-gray-500">{setting.description}</p>
                    </div>
                    <Switch
                      checked={setting.enabled}
                      className={classNames(
                        setting.enabled ? 'bg-indigo-600' : 'bg-gray-200',
                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                      )}
                    >
                      <span
                        className={classNames(
                          setting.enabled ? 'translate-x-5' : 'translate-x-0',
                          'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                        )}
                      />
                    </Switch>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-base font-semibold leading-6 text-gray-900">Appearance</h3>
              <div className="mt-6 space-y-6">
                {settings.appearance.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between">
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-900">{setting.name}</p>
                      <p className="text-sm text-gray-500">{setting.description}</p>
                    </div>
                    <Switch
                      checked={setting.enabled}
                      className={classNames(
                        setting.enabled ? 'bg-indigo-600' : 'bg-gray-200',
                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                      )}
                    >
                      <span
                        className={classNames(
                          setting.enabled ? 'translate-x-5' : 'translate-x-0',
                          'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                        )}
                      />
                    </Switch>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Integrations */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-base font-semibold leading-6 text-gray-900">Integrations</h3>
              <div className="mt-6 space-y-6">
                {settings.integrations.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between">
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-900">{setting.name}</p>
                      <p className="text-sm text-gray-500">{setting.description}</p>
                    </div>
                    <Switch
                      checked={setting.enabled}
                      className={classNames(
                        setting.enabled ? 'bg-indigo-600' : 'bg-gray-200',
                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                      )}
                    >
                      <span
                        className={classNames(
                          setting.enabled ? 'translate-x-5' : 'translate-x-0',
                          'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                        )}
                      />
                    </Switch>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 