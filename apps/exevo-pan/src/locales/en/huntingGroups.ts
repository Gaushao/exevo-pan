export default {
  Meta: {
    title: 'Hunting Groups',
    description: 'Join forces with your friends to hunt down rare bosses!',
  },
  defaultServer: '(any)',
  createGroup: 'Create group',
  settings: 'Settings',
  notificate: 'Notificate',
  apply: 'Apply',
  publicBoard: {
    title: 'Description',
    add: 'Add description',
    edit: 'Edit description',
  },
  privateBoard: {
    title: 'Internal message board',
    add: 'Add message',
    edit: 'Edit message',
  },
  members: 'Members',
  groupApplications: 'Group applications',
  logHistory: 'Log history',
  RollAvatar: {
    avatarAlt: 'New guild avatar',
    roll: 'Roll',
  },
  CreateGuildDialog: {
    successToast: 'Hunting group created!',
    errorMessage: '{{name}} already exists',
    groupName: 'Group name',
    namePlaceholder: 'Choose a group name',
    privateGroup: 'Private group',
    privateTooltip:
      'A private group can be found, but its members will be hidden',
    exevoProExclusive: '{{exevopro}} exclusive',
    unauthedAlert: 'You must {{login}} to create a hunting group',
    login: 'log in',
    cancel: 'Cancel',
    create: 'Create',
  },
  GuildGrid: {
    searchName: 'Search by name',
    searchPlaceholder: 'Hunting group name',
    server: 'Search by server',
    findGroups: 'Find groups',
    myGroups: 'My groups',
    GuildList: {
      member: 'member',
      members: 'members',
      privateTooltip: 'This is a private hunting group',
      apply: 'Apply',
      emptyState: 'No hunting groups',
    },
  },
  GuildHero: {
    member: 'member',
    members: 'members',
  },
  ApplyDialog: {
    heading: 'Apply to {{guildName}}',
    applyAs: 'Apply as',
    nameError: 'Name length must be between {{min}}-{{max}} characters',
    message: 'Message (optional)',
    messagePlaceholder: "I won't SD any Yeties I swear",
    cancel: 'Cancel',
    submit: 'Submit',
    toast: {
      success: 'Application sent!',
      error: 'You already joined this guild!',
    },
  },
  MemberList: {
    private: 'This is a private group',
    role: 'Role',
    name: 'Name',
    admin: 'Admin',
    moderator: 'Moderator',
    self: '(you)',
    ManageUser: {
      changeName: 'Change name',
      addRole: 'Add role',
      leaveGroup: 'Leave group',
      kickMember: 'Kick member',
    },
    ManagingModes: {
      Role: {
        heading: 'Change member role',
        cancel: 'Cancel',
        confirm: 'Confirm',
        successToast: '{{name}} was successfully updated!',
        options: {
          moderator: 'Moderator',
          member: 'Member',
        },
      },
      Exclusion: {
        heading: {
          leave: 'Leave hunting group',
          kick: 'Kick hunting group member',
        },
        confirmMessage: {
          leave: 'Are you sure you want to leave {{name}}?',
          kick: 'Are you sure you want to kick {{name}}?',
        },
        cancel: 'Cancel',
        leave: 'Leave',
        kick: 'Kick',
        groupDisbanded: 'Hunting group was disbanded',
        newAdmin: '{{name}} is the new group admin',
      },
      ChangeName: {
        heading: 'Change your name',
        nameInput: 'New name',
        nameError: 'Name length must be between {{min}}-{{max}} characters',
        cancel: 'Cancel',
        confirm: 'Confirm',
        successToast: 'Your name was updated successfully!',
      },
    },
  },
  SettingsDialog: {
    heading: 'Settings',
    registeredDevice: 'This device is registered!',
    testNotification: 'How about trying a {{button}} notification? 🔔',
    test: 'test',
    sampleNotification: {
      title: 'Hey there 👋',
      text: 'Everything looking good!',
    },
    enableNotifications: 'Please {{button}} on this device',
    enableButton: 'enable notifications',
    registerSuccess: 'This device was registered successfully!',
    notSupported: 'Web Push Notifications not supported by this device',
    enableGroupNotifications: 'Receive notifications from this group',
    receiveNotificationsFor: 'Receive notifications for:',
    cancel: 'Cancel',
    save: 'Save',
    successToast: 'Preferences saved!',
  },
  ApplyList: {
    name: 'Name',
    message: 'Message',
    accept: 'Accept',
    reject: 'Reject',
    rejectToast: 'Application rejected successfully!',
    loading: 'Loading...',
  },
  EditGuildDialog: {
    heading: 'Edit hunting group',
    guildName: 'Guild name',
    guildNamePlaceholder: 'New group name',
    nameError: 'Must be a unique name between {{min}}-{{max}} characters',
    description: 'Description',
    descriptionPlaceholder: 'Add group description',
    messageBoard: 'Message board (only seen by members)',
    messageBoardPlaceholder: 'Add a message to the board',
    privateGroup: 'Private group',
    privateTooltip:
      'A private group can be found, but its members will be hidden',
    exevoProRequired:
      'At least one Exevo Pro group member is required to set a private group',
    cancel: 'Cancel',
    save: 'Save',
    successToast: 'Guild was updated successfully!',
  },
  LogHistory: {
    event: 'Event',
    leave: '{{name}} left the group',
    reject: '{{actor}} rejected {{target}} application',
    kick: '{{actor}} kicked {{target}}',
    accept: '{{actor}} approved {{target}} application',
    notification: '{{actor}} sighted a {{boss}}',
    emptyState: 'No log history',
    loadMore: 'Load more',
  },
  NotificationDialog: {
    heading: 'Notificate group',
    search: 'Search boss',
    emptyState: 'No bosses',
    cancel: 'Cancel',
    send: 'Send notification',
    successToast: 'Notification was sent!',
  },
}
