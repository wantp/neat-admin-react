import React, {useState} from "react";
import {useIntl} from 'umi';
import {
  AccountBookOutlined,
  AimOutlined,
  AlertOutlined,
  AlibabaOutlined,
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  AlipayCircleOutlined,
  AlipayOutlined,
  AliwangwangOutlined,
  AliyunOutlined,
  AmazonOutlined,
  AndroidOutlined,
  AntCloudOutlined,
  AntDesignOutlined,
  ApartmentOutlined,
  ApiOutlined,
  AppleOutlined,
  AppstoreAddOutlined,
  AppstoreOutlined,
  AreaChartOutlined,
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
  ArrowsAltOutlined,
  AudioMutedOutlined,
  AudioOutlined,
  AuditOutlined,
  BackwardOutlined,
  BankOutlined,
  BarChartOutlined,
  BarcodeOutlined,
  BarsOutlined,
  BehanceOutlined,
  BehanceSquareOutlined,
  BellOutlined,
  BgColorsOutlined,
  BlockOutlined,
  BoldOutlined,
  BookOutlined,
  BorderBottomOutlined,
  BorderHorizontalOutlined,
  BorderInnerOutlined,
  BorderLeftOutlined,
  BorderOuterOutlined,
  BorderOutlined,
  BorderRightOutlined,
  BorderTopOutlined,
  BorderVerticleOutlined,
  BorderlessTableOutlined,
  BoxPlotOutlined,
  BranchesOutlined,
  BugOutlined,
  BuildOutlined,
  BulbOutlined,
  CalculatorOutlined,
  CalendarOutlined,
  CameraOutlined,
  CarOutlined,
  CaretDownOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  CaretUpOutlined,
  CarryOutOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  CheckSquareOutlined,
  ChromeOutlined,
  CiCircleOutlined,
  CiOutlined,
  ClearOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  CloseSquareOutlined,
  CloudDownloadOutlined,
  CloudOutlined,
  CloudServerOutlined,
  CloudSyncOutlined,
  CloudUploadOutlined,
  ClusterOutlined,
  CodeOutlined,
  CodeSandboxOutlined,
  CodepenCircleOutlined,
  CodepenOutlined,
  CoffeeOutlined,
  ColumnHeightOutlined,
  ColumnWidthOutlined,
  CommentOutlined,
  CompassOutlined,
  CompressOutlined,
  ConsoleSqlOutlined,
  ContactsOutlined,
  ContainerOutlined,
  ControlOutlined,
  CopyOutlined,
  CopyrightCircleOutlined,
  CopyrightOutlined,
  CreditCardOutlined,
  CrownOutlined,
  CustomerServiceOutlined,
  DashOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  DeleteColumnOutlined,
  DeleteOutlined,
  DeleteRowOutlined,
  DeliveredProcedureOutlined,
  DeploymentUnitOutlined,
  DesktopOutlined,
  DiffOutlined,
  DingdingOutlined,
  DingtalkOutlined,
  DisconnectOutlined,
  DislikeOutlined,
  DollarCircleOutlined,
  DollarOutlined,
  DotChartOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  DownCircleOutlined,
  DownOutlined,
  DownSquareOutlined,
  DownloadOutlined,
  DragOutlined,
  DribbbleOutlined,
  DribbbleSquareOutlined,
  DropboxOutlined,
  EditOutlined,
  EllipsisOutlined,
  EnterOutlined,
  EnvironmentOutlined,
  EuroCircleOutlined,
  EuroOutlined,
  ExceptionOutlined,
  ExclamationCircleOutlined,
  ExclamationOutlined,
  ExpandAltOutlined,
  ExpandOutlined,
  ExperimentOutlined,
  ExportOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  FacebookOutlined,
  FallOutlined,
  FastBackwardOutlined,
  FastForwardOutlined,
  FieldBinaryOutlined,
  FieldNumberOutlined,
  FieldStringOutlined,
  FieldTimeOutlined,
  FileAddOutlined,
  FileDoneOutlined,
  FileExcelOutlined,
  FileExclamationOutlined,
  FileGifOutlined,
  FileImageOutlined,
  FileJpgOutlined,
  FileMarkdownOutlined,
  FileOutlined,
  FilePdfOutlined,
  FilePptOutlined,
  FileProtectOutlined,
  FileSearchOutlined,
  FileSyncOutlined,
  FileTextOutlined,
  FileUnknownOutlined,
  FileWordOutlined,
  FileZipOutlined,
  FilterOutlined,
  FireOutlined,
  FlagOutlined,
  FolderAddOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  FolderViewOutlined,
  FontColorsOutlined,
  FontSizeOutlined,
  ForkOutlined,
  FormOutlined,
  FormatPainterOutlined,
  ForwardOutlined,
  FrownOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  FunctionOutlined,
  FundOutlined,
  FundProjectionScreenOutlined,
  FundViewOutlined,
  FunnelPlotOutlined,
  GatewayOutlined,
  GifOutlined,
  GiftOutlined,
  GithubOutlined,
  GitlabOutlined,
  GlobalOutlined,
  GoldOutlined,
  GoogleOutlined,
  GooglePlusOutlined,
  GroupOutlined,
  HddOutlined,
  HeartOutlined,
  HeatMapOutlined,
  HighlightOutlined,
  HistoryOutlined,
  HomeOutlined,
  HourglassOutlined,
  Html5Outlined,
  IdcardOutlined,
  IeOutlined,
  ImportOutlined,
  InboxOutlined,
  InfoCircleOutlined,
  InfoOutlined,
  InsertRowAboveOutlined,
  InsertRowBelowOutlined,
  InsertRowLeftOutlined,
  InsertRowRightOutlined,
  InstagramOutlined,
  InsuranceOutlined,
  InteractionOutlined,
  IssuesCloseOutlined,
  ItalicOutlined,
  KeyOutlined,
  LaptopOutlined,
  LayoutOutlined,
  LeftCircleOutlined,
  LeftOutlined,
  LeftSquareOutlined,
  LikeOutlined,
  LineChartOutlined,
  LineHeightOutlined,
  LineOutlined,
  LinkOutlined,
  LinkedinOutlined,
  Loading3QuartersOutlined,
  LoadingOutlined,
  LockOutlined,
  LoginOutlined,
  LogoutOutlined,
  MacCommandOutlined,
  MailOutlined,
  ManOutlined,
  MedicineBoxOutlined,
  MediumOutlined,
  MediumWorkmarkOutlined,
  MehOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  MergeCellsOutlined,
  MessageOutlined,
  MinusCircleOutlined,
  MinusOutlined,
  MinusSquareOutlined,
  MobileOutlined,
  MoneyCollectOutlined,
  MonitorOutlined,
  MoreOutlined,
  NodeCollapseOutlined,
  NodeExpandOutlined,
  NodeIndexOutlined,
  NotificationOutlined,
  NumberOutlined,
  OneToOneOutlined,
  OrderedListOutlined,
  PaperClipOutlined,
  PartitionOutlined,
  PauseCircleOutlined,
  PauseOutlined,
  PayCircleOutlined,
  PercentageOutlined,
  PhoneOutlined,
  PicCenterOutlined,
  PicLeftOutlined,
  PicRightOutlined,
  PictureOutlined,
  PieChartOutlined,
  PlayCircleOutlined,
  PlaySquareOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  PlusSquareOutlined,
  PoundCircleOutlined,
  PoundOutlined,
  PoweroffOutlined,
  PrinterOutlined,
  ProfileOutlined,
  ProjectOutlined,
  PropertySafetyOutlined,
  PullRequestOutlined,
  PushpinOutlined,
  QqOutlined,
  QrcodeOutlined,
  QuestionCircleOutlined,
  QuestionOutlined,
  RadarChartOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusSettingOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
  ReadOutlined,
  ReconciliationOutlined,
  RedEnvelopeOutlined,
  RedditOutlined,
  RedoOutlined,
  ReloadOutlined,
  RestOutlined,
  RetweetOutlined,
  RightCircleOutlined,
  RightOutlined,
  RightSquareOutlined,
  RiseOutlined,
  RobotOutlined,
  RocketOutlined,
  RollbackOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SafetyCertificateOutlined,
  SafetyOutlined,
  SaveOutlined,
  ScanOutlined,
  ScheduleOutlined,
  ScissorOutlined,
  SearchOutlined,
  SecurityScanOutlined,
  SelectOutlined,
  SendOutlined,
  SettingOutlined,
  ShakeOutlined,
  ShareAltOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  ShrinkOutlined,
  SisternodeOutlined,
  SketchOutlined,
  SkinOutlined,
  SkypeOutlined,
  SlackOutlined,
  SlackSquareOutlined,
  SlidersOutlined,
  SmallDashOutlined,
  SmileOutlined,
  SnippetsOutlined,
  SolutionOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  SoundOutlined,
  SplitCellsOutlined,
  StarOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  StockOutlined,
  StopOutlined,
  StrikethroughOutlined,
  SubnodeOutlined,
  SwapLeftOutlined,
  SwapOutlined,
  SwapRightOutlined,
  SwitcherOutlined,
  SyncOutlined,
  TableOutlined,
  TabletOutlined,
  TagOutlined,
  TagsOutlined,
  TaobaoCircleOutlined,
  TaobaoOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  ToTopOutlined,
  ToolOutlined,
  TrademarkCircleOutlined,
  TrademarkOutlined,
  TransactionOutlined,
  TranslationOutlined,
  TrophyOutlined,
  TwitterOutlined,
  UnderlineOutlined,
  UndoOutlined,
  UngroupOutlined,
  UnlockOutlined,
  UnorderedListOutlined,
  UpCircleOutlined,
  UpOutlined,
  UpSquareOutlined,
  UploadOutlined,
  UsbOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
  UsergroupDeleteOutlined,
  VerifiedOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
  VideoCameraAddOutlined,
  VideoCameraOutlined,
  WalletOutlined,
  WarningOutlined,
  WechatOutlined,
  WeiboCircleOutlined,
  WeiboOutlined,
  WeiboSquareOutlined,
  WhatsAppOutlined,
  WifiOutlined,
  WindowsOutlined,
  WomanOutlined,
  YahooOutlined,
  YoutubeOutlined,
  YuqueOutlined,
  ZhihuOutlined,
  ZoomInOutlined,
  ZoomOutOutlined
} from "@ant-design/icons";
import {Form, Input} from "antd";
import styles from "./index.less"

const IconMap = {
  AccountBookOutlined: <AccountBookOutlined/>,
  AimOutlined: <AimOutlined/>,
  AlertOutlined: <AlertOutlined/>,
  AlibabaOutlined: <AlibabaOutlined/>,
  AlignCenterOutlined: <AlignCenterOutlined/>,
  AlignLeftOutlined: <AlignLeftOutlined/>,
  AlignRightOutlined: <AlignRightOutlined/>,
  AlipayCircleOutlined: <AlipayCircleOutlined/>,
  AlipayOutlined: <AlipayOutlined/>,
  AliwangwangOutlined: <AliwangwangOutlined/>,
  AliyunOutlined: <AliyunOutlined/>,
  AmazonOutlined: <AmazonOutlined/>,
  AndroidOutlined: <AndroidOutlined/>,
  AntCloudOutlined: <AntCloudOutlined/>,
  AntDesignOutlined: <AntDesignOutlined/>,
  ApartmentOutlined: <ApartmentOutlined/>,
  ApiOutlined: <ApiOutlined/>,
  AppleOutlined: <AppleOutlined/>,
  AppstoreAddOutlined: <AppstoreAddOutlined/>,
  AppstoreOutlined: <AppstoreOutlined/>,
  AreaChartOutlined: <AreaChartOutlined/>,
  ArrowDownOutlined: <ArrowDownOutlined/>,
  ArrowLeftOutlined: <ArrowLeftOutlined/>,
  ArrowRightOutlined: <ArrowRightOutlined/>,
  ArrowUpOutlined: <ArrowUpOutlined/>,
  ArrowsAltOutlined: <ArrowsAltOutlined/>,
  AudioMutedOutlined: <AudioMutedOutlined/>,
  AudioOutlined: <AudioOutlined/>,
  AuditOutlined: <AuditOutlined/>,
  BackwardOutlined: <BackwardOutlined/>,
  BankOutlined: <BankOutlined/>,
  BarChartOutlined: <BarChartOutlined/>,
  BarcodeOutlined: <BarcodeOutlined/>,
  BarsOutlined: <BarsOutlined/>,
  BehanceOutlined: <BehanceOutlined/>,
  BehanceSquareOutlined: <BehanceSquareOutlined/>,
  BellOutlined: <BellOutlined/>,
  BgColorsOutlined: <BgColorsOutlined/>,
  BlockOutlined: <BlockOutlined/>,
  BoldOutlined: <BoldOutlined/>,
  BookOutlined: <BookOutlined/>,
  BorderBottomOutlined: <BorderBottomOutlined/>,
  BorderHorizontalOutlined: <BorderHorizontalOutlined/>,
  BorderInnerOutlined: <BorderInnerOutlined/>,
  BorderLeftOutlined: <BorderLeftOutlined/>,
  BorderOuterOutlined: <BorderOuterOutlined/>,
  BorderOutlined: <BorderOutlined/>,
  BorderRightOutlined: <BorderRightOutlined/>,
  BorderTopOutlined: <BorderTopOutlined/>,
  BorderVerticleOutlined: <BorderVerticleOutlined/>,
  BorderlessTableOutlined: <BorderlessTableOutlined/>,
  BoxPlotOutlined: <BoxPlotOutlined/>,
  BranchesOutlined: <BranchesOutlined/>,
  BugOutlined: <BugOutlined/>,
  BuildOutlined: <BuildOutlined/>,
  BulbOutlined: <BulbOutlined/>,
  CalculatorOutlined: <CalculatorOutlined/>,
  CalendarOutlined: <CalendarOutlined/>,
  CameraOutlined: <CameraOutlined/>,
  CarOutlined: <CarOutlined/>,
  CaretDownOutlined: <CaretDownOutlined/>,
  CaretLeftOutlined: <CaretLeftOutlined/>,
  CaretRightOutlined: <CaretRightOutlined/>,
  CaretUpOutlined: <CaretUpOutlined/>,
  CarryOutOutlined: <CarryOutOutlined/>,
  CheckCircleOutlined: <CheckCircleOutlined/>,
  CheckOutlined: <CheckOutlined/>,
  CheckSquareOutlined: <CheckSquareOutlined/>,
  ChromeOutlined: <ChromeOutlined/>,
  CiCircleOutlined: <CiCircleOutlined/>,
  CiOutlined: <CiOutlined/>,
  ClearOutlined: <ClearOutlined/>,
  ClockCircleOutlined: <ClockCircleOutlined/>,
  CloseCircleOutlined: <CloseCircleOutlined/>,
  CloseOutlined: <CloseOutlined/>,
  CloseSquareOutlined: <CloseSquareOutlined/>,
  CloudDownloadOutlined: <CloudDownloadOutlined/>,
  CloudOutlined: <CloudOutlined/>,
  CloudServerOutlined: <CloudServerOutlined/>,
  CloudSyncOutlined: <CloudSyncOutlined/>,
  CloudUploadOutlined: <CloudUploadOutlined/>,
  ClusterOutlined: <ClusterOutlined/>,
  CodeOutlined: <CodeOutlined/>,
  CodeSandboxOutlined: <CodeSandboxOutlined/>,
  CodepenCircleOutlined: <CodepenCircleOutlined/>,
  CodepenOutlined: <CodepenOutlined/>,
  CoffeeOutlined: <CoffeeOutlined/>,
  ColumnHeightOutlined: <ColumnHeightOutlined/>,
  ColumnWidthOutlined: <ColumnWidthOutlined/>,
  CommentOutlined: <CommentOutlined/>,
  CompassOutlined: <CompassOutlined/>,
  CompressOutlined: <CompressOutlined/>,
  ConsoleSqlOutlined: <ConsoleSqlOutlined/>,
  ContactsOutlined: <ContactsOutlined/>,
  ContainerOutlined: <ContainerOutlined/>,
  ControlOutlined: <ControlOutlined/>,
  CopyOutlined: <CopyOutlined/>,
  CopyrightCircleOutlined: <CopyrightCircleOutlined/>,
  CopyrightOutlined: <CopyrightOutlined/>,
  CreditCardOutlined: <CreditCardOutlined/>,
  CrownOutlined: <CrownOutlined/>,
  CustomerServiceOutlined: <CustomerServiceOutlined/>,
  DashOutlined: <DashOutlined/>,
  DashboardOutlined: <DashboardOutlined/>,
  DatabaseOutlined: <DatabaseOutlined/>,
  DeleteColumnOutlined: <DeleteColumnOutlined/>,
  DeleteOutlined: <DeleteOutlined/>,
  DeleteRowOutlined: <DeleteRowOutlined/>,
  DeliveredProcedureOutlined: <DeliveredProcedureOutlined/>,
  DeploymentUnitOutlined: <DeploymentUnitOutlined/>,
  DesktopOutlined: <DesktopOutlined/>,
  DiffOutlined: <DiffOutlined/>,
  DingdingOutlined: <DingdingOutlined/>,
  DingtalkOutlined: <DingtalkOutlined/>,
  DisconnectOutlined: <DisconnectOutlined/>,
  DislikeOutlined: <DislikeOutlined/>,
  DollarCircleOutlined: <DollarCircleOutlined/>,
  DollarOutlined: <DollarOutlined/>,
  DotChartOutlined: <DotChartOutlined/>,
  DoubleLeftOutlined: <DoubleLeftOutlined/>,
  DoubleRightOutlined: <DoubleRightOutlined/>,
  DownCircleOutlined: <DownCircleOutlined/>,
  DownOutlined: <DownOutlined/>,
  DownSquareOutlined: <DownSquareOutlined/>,
  DownloadOutlined: <DownloadOutlined/>,
  DragOutlined: <DragOutlined/>,
  DribbbleOutlined: <DribbbleOutlined/>,
  DribbbleSquareOutlined: <DribbbleSquareOutlined/>,
  DropboxOutlined: <DropboxOutlined/>,
  EditOutlined: <EditOutlined/>,
  EllipsisOutlined: <EllipsisOutlined/>,
  EnterOutlined: <EnterOutlined/>,
  EnvironmentOutlined: <EnvironmentOutlined/>,
  EuroCircleOutlined: <EuroCircleOutlined/>,
  EuroOutlined: <EuroOutlined/>,
  ExceptionOutlined: <ExceptionOutlined/>,
  ExclamationCircleOutlined: <ExclamationCircleOutlined/>,
  ExclamationOutlined: <ExclamationOutlined/>,
  ExpandAltOutlined: <ExpandAltOutlined/>,
  ExpandOutlined: <ExpandOutlined/>,
  ExperimentOutlined: <ExperimentOutlined/>,
  ExportOutlined: <ExportOutlined/>,
  EyeInvisibleOutlined: <EyeInvisibleOutlined/>,
  EyeOutlined: <EyeOutlined/>,
  FacebookOutlined: <FacebookOutlined/>,
  FallOutlined: <FallOutlined/>,
  FastBackwardOutlined: <FastBackwardOutlined/>,
  FastForwardOutlined: <FastForwardOutlined/>,
  FieldBinaryOutlined: <FieldBinaryOutlined/>,
  FieldNumberOutlined: <FieldNumberOutlined/>,
  FieldStringOutlined: <FieldStringOutlined/>,
  FieldTimeOutlined: <FieldTimeOutlined/>,
  FileAddOutlined: <FileAddOutlined/>,
  FileDoneOutlined: <FileDoneOutlined/>,
  FileExcelOutlined: <FileExcelOutlined/>,
  FileExclamationOutlined: <FileExclamationOutlined/>,
  FileGifOutlined: <FileGifOutlined/>,
  FileImageOutlined: <FileImageOutlined/>,
  FileJpgOutlined: <FileJpgOutlined/>,
  FileMarkdownOutlined: <FileMarkdownOutlined/>,
  FileOutlined: <FileOutlined/>,
  FilePdfOutlined: <FilePdfOutlined/>,
  FilePptOutlined: <FilePptOutlined/>,
  FileProtectOutlined: <FileProtectOutlined/>,
  FileSearchOutlined: <FileSearchOutlined/>,
  FileSyncOutlined: <FileSyncOutlined/>,
  FileTextOutlined: <FileTextOutlined/>,
  FileUnknownOutlined: <FileUnknownOutlined/>,
  FileWordOutlined: <FileWordOutlined/>,
  FileZipOutlined: <FileZipOutlined/>,
  FilterOutlined: <FilterOutlined/>,
  FireOutlined: <FireOutlined/>,
  FlagOutlined: <FlagOutlined/>,
  FolderAddOutlined: <FolderAddOutlined/>,
  FolderOpenOutlined: <FolderOpenOutlined/>,
  FolderOutlined: <FolderOutlined/>,
  FolderViewOutlined: <FolderViewOutlined/>,
  FontColorsOutlined: <FontColorsOutlined/>,
  FontSizeOutlined: <FontSizeOutlined/>,
  ForkOutlined: <ForkOutlined/>,
  FormOutlined: <FormOutlined/>,
  FormatPainterOutlined: <FormatPainterOutlined/>,
  ForwardOutlined: <ForwardOutlined/>,
  FrownOutlined: <FrownOutlined/>,
  FullscreenExitOutlined: <FullscreenExitOutlined/>,
  FullscreenOutlined: <FullscreenOutlined/>,
  FunctionOutlined: <FunctionOutlined/>,
  FundOutlined: <FundOutlined/>,
  FundProjectionScreenOutlined: <FundProjectionScreenOutlined/>,
  FundViewOutlined: <FundViewOutlined/>,
  FunnelPlotOutlined: <FunnelPlotOutlined/>,
  GatewayOutlined: <GatewayOutlined/>,
  GifOutlined: <GifOutlined/>,
  GiftOutlined: <GiftOutlined/>,
  GithubOutlined: <GithubOutlined/>,
  GitlabOutlined: <GitlabOutlined/>,
  GlobalOutlined: <GlobalOutlined/>,
  GoldOutlined: <GoldOutlined/>,
  GoogleOutlined: <GoogleOutlined/>,
  GooglePlusOutlined: <GooglePlusOutlined/>,
  GroupOutlined: <GroupOutlined/>,
  HddOutlined: <HddOutlined/>,
  HeartOutlined: <HeartOutlined/>,
  HeatMapOutlined: <HeatMapOutlined/>,
  HighlightOutlined: <HighlightOutlined/>,
  HistoryOutlined: <HistoryOutlined/>,
  HomeOutlined: <HomeOutlined/>,
  HourglassOutlined: <HourglassOutlined/>,
  Html5Outlined: <Html5Outlined/>,
  IdcardOutlined: <IdcardOutlined/>,
  IeOutlined: <IeOutlined/>,
  ImportOutlined: <ImportOutlined/>,
  InboxOutlined: <InboxOutlined/>,
  InfoCircleOutlined: <InfoCircleOutlined/>,
  InfoOutlined: <InfoOutlined/>,
  InsertRowAboveOutlined: <InsertRowAboveOutlined/>,
  InsertRowBelowOutlined: <InsertRowBelowOutlined/>,
  InsertRowLeftOutlined: <InsertRowLeftOutlined/>,
  InsertRowRightOutlined: <InsertRowRightOutlined/>,
  InstagramOutlined: <InstagramOutlined/>,
  InsuranceOutlined: <InsuranceOutlined/>,
  InteractionOutlined: <InteractionOutlined/>,
  IssuesCloseOutlined: <IssuesCloseOutlined/>,
  ItalicOutlined: <ItalicOutlined/>,
  KeyOutlined: <KeyOutlined/>,
  LaptopOutlined: <LaptopOutlined/>,
  LayoutOutlined: <LayoutOutlined/>,
  LeftCircleOutlined: <LeftCircleOutlined/>,
  LeftOutlined: <LeftOutlined/>,
  LeftSquareOutlined: <LeftSquareOutlined/>,
  LikeOutlined: <LikeOutlined/>,
  LineChartOutlined: <LineChartOutlined/>,
  LineHeightOutlined: <LineHeightOutlined/>,
  LineOutlined: <LineOutlined/>,
  LinkOutlined: <LinkOutlined/>,
  LinkedinOutlined: <LinkedinOutlined/>,
  Loading3QuartersOutlined: <Loading3QuartersOutlined/>,
  LoadingOutlined: <LoadingOutlined/>,
  LockOutlined: <LockOutlined/>,
  LoginOutlined: <LoginOutlined/>,
  LogoutOutlined: <LogoutOutlined/>,
  MacCommandOutlined: <MacCommandOutlined/>,
  MailOutlined: <MailOutlined/>,
  ManOutlined: <ManOutlined/>,
  MedicineBoxOutlined: <MedicineBoxOutlined/>,
  MediumOutlined: <MediumOutlined/>,
  MediumWorkmarkOutlined: <MediumWorkmarkOutlined/>,
  MehOutlined: <MehOutlined/>,
  MenuFoldOutlined: <MenuFoldOutlined/>,
  MenuOutlined: <MenuOutlined/>,
  MenuUnfoldOutlined: <MenuUnfoldOutlined/>,
  MergeCellsOutlined: <MergeCellsOutlined/>,
  MessageOutlined: <MessageOutlined/>,
  MinusCircleOutlined: <MinusCircleOutlined/>,
  MinusOutlined: <MinusOutlined/>,
  MinusSquareOutlined: <MinusSquareOutlined/>,
  MobileOutlined: <MobileOutlined/>,
  MoneyCollectOutlined: <MoneyCollectOutlined/>,
  MonitorOutlined: <MonitorOutlined/>,
  MoreOutlined: <MoreOutlined/>,
  NodeCollapseOutlined: <NodeCollapseOutlined/>,
  NodeExpandOutlined: <NodeExpandOutlined/>,
  NodeIndexOutlined: <NodeIndexOutlined/>,
  NotificationOutlined: <NotificationOutlined/>,
  NumberOutlined: <NumberOutlined/>,
  OneToOneOutlined: <OneToOneOutlined/>,
  OrderedListOutlined: <OrderedListOutlined/>,
  PaperClipOutlined: <PaperClipOutlined/>,
  PartitionOutlined: <PartitionOutlined/>,
  PauseCircleOutlined: <PauseCircleOutlined/>,
  PauseOutlined: <PauseOutlined/>,
  PayCircleOutlined: <PayCircleOutlined/>,
  PercentageOutlined: <PercentageOutlined/>,
  PhoneOutlined: <PhoneOutlined/>,
  PicCenterOutlined: <PicCenterOutlined/>,
  PicLeftOutlined: <PicLeftOutlined/>,
  PicRightOutlined: <PicRightOutlined/>,
  PictureOutlined: <PictureOutlined/>,
  PieChartOutlined: <PieChartOutlined/>,
  PlayCircleOutlined: <PlayCircleOutlined/>,
  PlaySquareOutlined: <PlaySquareOutlined/>,
  PlusCircleOutlined: <PlusCircleOutlined/>,
  PlusOutlined: <PlusOutlined/>,
  PlusSquareOutlined: <PlusSquareOutlined/>,
  PoundCircleOutlined: <PoundCircleOutlined/>,
  PoundOutlined: <PoundOutlined/>,
  PoweroffOutlined: <PoweroffOutlined/>,
  PrinterOutlined: <PrinterOutlined/>,
  ProfileOutlined: <ProfileOutlined/>,
  ProjectOutlined: <ProjectOutlined/>,
  PropertySafetyOutlined: <PropertySafetyOutlined/>,
  PullRequestOutlined: <PullRequestOutlined/>,
  PushpinOutlined: <PushpinOutlined/>,
  QqOutlined: <QqOutlined/>,
  QrcodeOutlined: <QrcodeOutlined/>,
  QuestionCircleOutlined: <QuestionCircleOutlined/>,
  QuestionOutlined: <QuestionOutlined/>,
  RadarChartOutlined: <RadarChartOutlined/>,
  RadiusBottomleftOutlined: <RadiusBottomleftOutlined/>,
  RadiusBottomrightOutlined: <RadiusBottomrightOutlined/>,
  RadiusSettingOutlined: <RadiusSettingOutlined/>,
  RadiusUpleftOutlined: <RadiusUpleftOutlined/>,
  RadiusUprightOutlined: <RadiusUprightOutlined/>,
  ReadOutlined: <ReadOutlined/>,
  ReconciliationOutlined: <ReconciliationOutlined/>,
  RedEnvelopeOutlined: <RedEnvelopeOutlined/>,
  RedditOutlined: <RedditOutlined/>,
  RedoOutlined: <RedoOutlined/>,
  ReloadOutlined: <ReloadOutlined/>,
  RestOutlined: <RestOutlined/>,
  RetweetOutlined: <RetweetOutlined/>,
  RightCircleOutlined: <RightCircleOutlined/>,
  RightOutlined: <RightOutlined/>,
  RightSquareOutlined: <RightSquareOutlined/>,
  RiseOutlined: <RiseOutlined/>,
  RobotOutlined: <RobotOutlined/>,
  RocketOutlined: <RocketOutlined/>,
  RollbackOutlined: <RollbackOutlined/>,
  RotateLeftOutlined: <RotateLeftOutlined/>,
  RotateRightOutlined: <RotateRightOutlined/>,
  SafetyCertificateOutlined: <SafetyCertificateOutlined/>,
  SafetyOutlined: <SafetyOutlined/>,
  SaveOutlined: <SaveOutlined/>,
  ScanOutlined: <ScanOutlined/>,
  ScheduleOutlined: <ScheduleOutlined/>,
  ScissorOutlined: <ScissorOutlined/>,
  SearchOutlined: <SearchOutlined/>,
  SecurityScanOutlined: <SecurityScanOutlined/>,
  SelectOutlined: <SelectOutlined/>,
  SendOutlined: <SendOutlined/>,
  SettingOutlined: <SettingOutlined/>,
  ShakeOutlined: <ShakeOutlined/>,
  ShareAltOutlined: <ShareAltOutlined/>,
  ShopOutlined: <ShopOutlined/>,
  ShoppingCartOutlined: <ShoppingCartOutlined/>,
  ShoppingOutlined: <ShoppingOutlined/>,
  ShrinkOutlined: <ShrinkOutlined/>,
  SisternodeOutlined: <SisternodeOutlined/>,
  SketchOutlined: <SketchOutlined/>,
  SkinOutlined: <SkinOutlined/>,
  SkypeOutlined: <SkypeOutlined/>,
  SlackOutlined: <SlackOutlined/>,
  SlackSquareOutlined: <SlackSquareOutlined/>,
  SlidersOutlined: <SlidersOutlined/>,
  SmallDashOutlined: <SmallDashOutlined/>,
  SmileOutlined: <SmileOutlined/>,
  SnippetsOutlined: <SnippetsOutlined/>,
  SolutionOutlined: <SolutionOutlined/>,
  SortAscendingOutlined: <SortAscendingOutlined/>,
  SortDescendingOutlined: <SortDescendingOutlined/>,
  SoundOutlined: <SoundOutlined/>,
  SplitCellsOutlined: <SplitCellsOutlined/>,
  StarOutlined: <StarOutlined/>,
  StepBackwardOutlined: <StepBackwardOutlined/>,
  StepForwardOutlined: <StepForwardOutlined/>,
  StockOutlined: <StockOutlined/>,
  StopOutlined: <StopOutlined/>,
  StrikethroughOutlined: <StrikethroughOutlined/>,
  SubnodeOutlined: <SubnodeOutlined/>,
  SwapLeftOutlined: <SwapLeftOutlined/>,
  SwapOutlined: <SwapOutlined/>,
  SwapRightOutlined: <SwapRightOutlined/>,
  SwitcherOutlined: <SwitcherOutlined/>,
  SyncOutlined: <SyncOutlined/>,
  TableOutlined: <TableOutlined/>,
  TabletOutlined: <TabletOutlined/>,
  TagOutlined: <TagOutlined/>,
  TagsOutlined: <TagsOutlined/>,
  TaobaoCircleOutlined: <TaobaoCircleOutlined/>,
  TaobaoOutlined: <TaobaoOutlined/>,
  TeamOutlined: <TeamOutlined/>,
  ThunderboltOutlined: <ThunderboltOutlined/>,
  ToTopOutlined: <ToTopOutlined/>,
  ToolOutlined: <ToolOutlined/>,
  TrademarkCircleOutlined: <TrademarkCircleOutlined/>,
  TrademarkOutlined: <TrademarkOutlined/>,
  TransactionOutlined: <TransactionOutlined/>,
  TranslationOutlined: <TranslationOutlined/>,
  TrophyOutlined: <TrophyOutlined/>,
  TwitterOutlined: <TwitterOutlined/>,
  UnderlineOutlined: <UnderlineOutlined/>,
  UndoOutlined: <UndoOutlined/>,
  UngroupOutlined: <UngroupOutlined/>,
  UnlockOutlined: <UnlockOutlined/>,
  UnorderedListOutlined: <UnorderedListOutlined/>,
  UpCircleOutlined: <UpCircleOutlined/>,
  UpOutlined: <UpOutlined/>,
  UpSquareOutlined: <UpSquareOutlined/>,
  UploadOutlined: <UploadOutlined/>,
  UsbOutlined: <UsbOutlined/>,
  UserAddOutlined: <UserAddOutlined/>,
  UserDeleteOutlined: <UserDeleteOutlined/>,
  UserOutlined: <UserOutlined/>,
  UserSwitchOutlined: <UserSwitchOutlined/>,
  UsergroupAddOutlined: <UsergroupAddOutlined/>,
  UsergroupDeleteOutlined: <UsergroupDeleteOutlined/>,
  VerifiedOutlined: <VerifiedOutlined/>,
  VerticalAlignBottomOutlined: <VerticalAlignBottomOutlined/>,
  VerticalAlignMiddleOutlined: <VerticalAlignMiddleOutlined/>,
  VerticalAlignTopOutlined: <VerticalAlignTopOutlined/>,
  VerticalLeftOutlined: <VerticalLeftOutlined/>,
  VerticalRightOutlined: <VerticalRightOutlined/>,
  VideoCameraAddOutlined: <VideoCameraAddOutlined/>,
  VideoCameraOutlined: <VideoCameraOutlined/>,
  WalletOutlined: <WalletOutlined/>,
  WarningOutlined: <WarningOutlined/>,
  WechatOutlined: <WechatOutlined/>,
  WeiboCircleOutlined: <WeiboCircleOutlined/>,
  WeiboOutlined: <WeiboOutlined/>,
  WeiboSquareOutlined: <WeiboSquareOutlined/>,
  WhatsAppOutlined: <WhatsAppOutlined/>,
  WifiOutlined: <WifiOutlined/>,
  WindowsOutlined: <WindowsOutlined/>,
  WomanOutlined: <WomanOutlined/>,
  YahooOutlined: <YahooOutlined/>,
  YoutubeOutlined: <YoutubeOutlined/>,
  YuqueOutlined: <YuqueOutlined/>,
  ZhihuOutlined: <ZhihuOutlined/>,
  ZoomInOutlined: <ZoomInOutlined/>,
  ZoomOutOutlined: <ZoomOutOutlined/>
};

const IconsList: React.FC<{ onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void }> = (props) => {
  const intl = useIntl();

  const {onClick} = props;

  const [showIconKeys, setShowIconKeys] = useState<string[]>(Object.keys(IconMap));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;

    const matchKey: string[] = [];

    Object.keys(IconMap).forEach(key => {
      if (key.toLowerCase().search(targetValue.toLowerCase()) !== -1) {
        matchKey.push(key);
      }
    })

    setShowIconKeys(matchKey);
  }

  return (
    <div className={styles.iconsContainer}>
      <div className={styles.iconsSearch}>
        <Form autoComplete="off">
          <Form.Item name="name">
            <Input style={{width: 220, margin: '10px 40px'}} size="large"
                   placeholder={intl.formatMessage({id: "common.search"})} onChange={onChange}/>
          </Form.Item>
        </Form>
      </div>
      <ul className={styles.iconsList}>
        {
          showIconKeys.map((key: string) => (
            <li key={key} data-key={key} onClick={onClick}>
              {IconMap[key]}
            </li>
          ))
        }
      </ul>
    </div>
  )
};

export
{
  IconMap,
  IconsList,
}