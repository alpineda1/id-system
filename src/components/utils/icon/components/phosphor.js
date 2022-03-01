import {
  AddressBook,
  BookOpen,
  Books,
  Buildings,
  Calendar,
  CaretLeft,
  ChartBar,
  ClockCounterClockwise,
  Compass,
  Cursor,
  EnvelopeSimple,
  File,
  FileText,
  FishSimple,
  Flag,
  FolderNotchPlus,
  FolderSimplePlus,
  Funnel,
  House,
  IdentificationBadge,
  IdentificationCard,
  Leaf,
  List,
  Moon,
  SignIn,
  SignOut,
  SimCard,
  SortAscending,
  SortDescending,
  Sun,
  Textbox,
  Trash,
  UserCircle,
  UserCirclePlus,
  UserPlus,
  Users,
  UsersThree,
} from 'phosphor-react';

const Phosphor = ({ icon, weight }) => {
  switch (icon) {
    case 'address-book':
      return <AddressBook weight={weight} />;
    case 'book-open':
      return <BookOpen weight={weight} />;
    case 'books':
      return <Books weight={weight} />;
    case 'buildings':
      return <Buildings weight={weight} />;
    case 'calendar':
      return <Calendar weight={weight} />;
    case 'caret-left':
      return <CaretLeft weight={weight} />;
    case 'chart-bar':
      return <ChartBar weight={weight} />;
    case 'compass':
      return <Compass weight={weight} />;
    case 'clock-counter-clockwise':
      return <ClockCounterClockwise weight={weight} />;
    case 'cursor':
      return <Cursor weight={weight} />;
    case 'envelope-simple':
      return <EnvelopeSimple weight={weight} />;
    case 'file-text':
      return <FileText weight={weight} />;
    case 'file':
      return <File weight={weight} />;
    case 'fish-simple':
      return <FishSimple weight={weight} />;
    case 'flag':
      return <Flag weight={weight} />;
    case 'funnel':
      return <Funnel weight={weight} />;
    case 'folder-notch-plus':
      return <FolderNotchPlus weight={weight} />;
    case 'folder-simple-plus':
      return <FolderSimplePlus weight={weight} />;
    case 'identification-badge':
      return <IdentificationBadge weight={weight} />;
    case 'identification-card':
      return <IdentificationCard weight={weight} />;
    case 'leaf':
      return <Leaf weight={weight} />;
    case 'list':
      return <List weight={weight} />;
    case 'moon':
      return <Moon weight={weight} />;
    case 'sign-in':
      return <SignIn weight={weight} />;
    case 'sign-out':
      return <SignOut weight={weight} />;
    case 'sim-card':
      return <SimCard weight={weight} />;
    case 'sort-ascending':
      return <SortAscending weight={weight} />;
    case 'sort-descending':
      return <SortDescending weight={weight} />;
    case 'sun':
      return <Sun weight={weight} />;
    case 'textbox':
      return <Textbox weight={weight} />;
    case 'trash':
      return <Trash weight={weight} />;
    case 'user-circle':
      return <UserCircle weight={weight} />;
    case 'user-circle-plus':
      return <UserCirclePlus weight={weight} />;
    case 'user-plus':
      return <UserPlus weight={weight} />;
    case 'users':
      return <Users weight={weight} />;
    case 'users-three':
      return <UsersThree weight={weight} />;
    default:
      return <House weight={weight} />;
  }
};

export default Phosphor;
