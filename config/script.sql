create table T_Ingredient
(
  id  int identity
    primary key,
  nom varchar(40)
    unique
)
go

create table T_Machine
(
  id       tinyint identity
    primary key,
  capacite smallint,
  name     varchar(40)
)
go

create table T_Nourriture
(
  id  tinyint identity
    primary key,
  nom varchar(40)
)
go

create table T_Formule
(
  pourcentage   float,
  nourriture_ID tinyint
    references T_Nourriture,
  ingredient_ID int
    references T_Ingredient,
  id            tinyint identity
    primary key
)
go

create table T_Machine_specialite
(
  id            int identity
    constraint T_Machine_specialite_pk
      primary key nonclustered,
  nourriture_ID tinyint
    constraint T_Machine_specialite_nourriture__fk
      references T_Nourriture,
  machine_ID    tinyint
    constraint T_Machine_specialite__fk
      references T_Machine
)
go

create table T_Periode_alimentation
(
  id      tinyint identity
    primary key,
  periode varchar(20)
)
go

create table T_TypePaddock
(
  id   tinyint identity
    primary key,
  type varchar(20)
)
go

create table T_Paddock
(
  id          tinyint identity
    primary key,
  nom         varchar(20),
  typePaddock tinyint
    references T_TypePaddock
)
go

create table T_Animal
(
  snit       int not null
    primary key,
  paddock_ID tinyint
    references T_Paddock
)
go

create table T_User
(
  login    varchar(40) not null
    primary key,
  password varchar(20)
)
go

create table T_Mesure
(
  id         int identity
    primary key,
  poids      smallint,
  dateMesure date,
  user_login varchar(40)
    references T_User,
  animal_ID  int
    references T_Animal
)
go

create table T_Mouvement
(
  id           int identity
    primary key,
  dateMvnt     date,
  paddock_src  tinyint
    references T_Paddock,
  paddock_dest tinyint
    references T_Paddock,
  animal_ID    int
    constraint T_Mouvement___fk
      references T_Animal,
  user_login   varchar(40)
    references T_User,
  mesure_ID    int
    references T_Mesure
)
go

create table T_Session_alimentation
(
  id         int identity
    primary key,
  date       date,
  user_login varchar(40)
    references T_User
)
go

create table T_Detail_session_alimnt
(
  id                      int identity
    primary key,
  note                    tinyint,
  nbrVache                smallint,
  commentaire             varchar(500),
  paddock_ID              tinyint
    references T_Paddock,
  session_alimentation_ID int
    references T_Session_alimentation
)
go

create table T_Periode_Ration
(
  id                     int identity
    primary key,
  quantite               smallint,
  moy_qte_vache          float,
  detailAlimentation_ID  int
    references T_Detail_session_alimnt,
  nourriture_ID          tinyint
    references T_Nourriture,
  periodeAlimentation_ID tinyint
    references T_Periode_alimentation
)
go

create table T_Recup_sessionAlimnt
(
  id               int identity
    primary key,
  nbrPreparation   smallint,
  qteTotal         int,
  nourriture_ID    tinyint
    references T_Nourriture,
  sessionAlimnt_ID int
    references T_Session_alimentation,
  machine_ID       tinyint
    references T_Machine,
  periode_ID       tinyint
    constraint T_Recup_sessionAlimnt___fk
      references T_Periode_alimentation
)
go

create table T_Livraison
(
  id                     int identity
    primary key,
  recup_sessionAlimnt_ID int
    references T_Recup_sessionAlimnt,
  quantite               int,
  numero                 smallint
)
go

create table T_Ingredient_param
(
  id            int identity
    primary key,
  qte_theorique float,
  qte_reel      smallint,
  difference    smallint,
  ingredient_ID int
    references T_Ingredient,
  livraison_ID  int
    references T_Livraison
)
go

create table T_Paddock_param
(
  paddock_ID   tinyint
    constraint T_Paddock_param___fk
      references T_Paddock,
  livraison_ID int
    constraint T_Paddock_param___fk_2
      references T_Livraison,
  id           int identity
    constraint T_Paddock_param_pk
      primary key nonclustered,
  quantite     int
)
go


