--
-- PostgreSQL database dump
--

\restrict yh9oL8aKOE9N2MH9VCKMvYoTifaP5u8SnP5rBadSGeiALazkyRen8xHgSPDeoQ8

-- Dumped from database version 17.6 (Debian 17.6-2.pgdg13+1)
-- Dumped by pg_dump version 17.6 (Debian 17.6-2.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: auth_role_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.auth_role_enum AS ENUM (
    'admin',
    'user',
    'manager'
);


ALTER TYPE public.auth_role_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: auth; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth (
    id integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    role public.auth_role_enum NOT NULL
);


ALTER TABLE public.auth OWNER TO postgres;

--
-- Name: auth_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.auth_id_seq OWNER TO postgres;

--
-- Name: auth_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_id_seq OWNED BY public.auth.id;


--
-- Name: company; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.company (
    id integer NOT NULL,
    name character varying NOT NULL,
    email character varying,
    logo character varying,
    website character varying
);


ALTER TABLE public.company OWNER TO postgres;

--
-- Name: company_employees_employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.company_employees_employees (
    "companyId" integer NOT NULL,
    "employeesId" integer NOT NULL
);


ALTER TABLE public.company_employees_employees OWNER TO postgres;

--
-- Name: company_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.company_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.company_id_seq OWNER TO postgres;

--
-- Name: company_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.company_id_seq OWNED BY public.company.id;


--
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    id integer NOT NULL,
    "firstName" character varying NOT NULL,
    "lastName" character varying NOT NULL,
    email character varying,
    phone character varying
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- Name: employees_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employees_id_seq OWNER TO postgres;

--
-- Name: employees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employees_id_seq OWNED BY public.employees.id;


--
-- Name: auth id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth ALTER COLUMN id SET DEFAULT nextval('public.auth_id_seq'::regclass);


--
-- Name: company id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company ALTER COLUMN id SET DEFAULT nextval('public.company_id_seq'::regclass);


--
-- Name: employees id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees ALTER COLUMN id SET DEFAULT nextval('public.employees_id_seq'::regclass);


--
-- Data for Name: auth; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth (id, email, password, role) FROM stdin;
2	user1@gmail.com	$2b$10$NL94qSulPBLPkQNGZvJOFOpe9XD9QP6.SPsDyJBIT6bCYqMyv4SeC	user
3	user2@gmail.com	$2b$10$buvF3vhiTkqzIzjOy7DYqei0GDVV1/zJdzppsJwV.nR/08tMoJlCu	user
4	user3@gmail.com	$2b$10$4bFfRyupQAxlPxXEUCL2t.B3teoMVnI1RBvg9Ff3LuSAkL.ESy2qC	user
5	user4@gmail.com	$2b$10$81CnNSOzVagnNHE1egCNk.V59l8dewBri8Rj5AjBFEdJM/x/.qPsq	user
6	user5@gmail.com	$2b$10$MhOReB/T6Z7FvMTOHNkyGuSZCAPJQvPE.nzxVaKQ1lsavw36xaFmS	user
1	dedomelchenko3@gmail.com	$2b$10$G7nnVVCzpN6XS.XBjDE/x.f/86vsRH.aIhV6LGoAO.TZDVMmUqsFK	admin
\.


--
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.company (id, name, email, logo, website) FROM stdin;
1	Myfeff	test@example.com	uploads/1761080385785-388534410.png	https://example.com
2	Myfeff	test@example.com	uploads/1761080501082-808541127.png	https://example.com
3	Alpha Solutions	alpha@example.com	uploads/1761080501082-808541127.png	https://alpha.example.com
4	Beta Corp	beta@example.com	uploads/1761080501082-808541127.png	https://beta.example.com
5	Gamma Tech	gamma@example.com	uploads/1761080501082-808541127.png	https://gamma.example.com
6	Delta Innovations	delta@example.com	uploads/1761080501082-808541127.png	https://delta.example.com
7	Epsilon LLC	epsilon@example.com	uploads/1761080501082-808541127.png	https://epsilon.example.com
8	Zeta Dynamics	zeta@example.com	uploads/1761080501082-808541127.png	https://zeta.example.com
9	Eta Ventures	eta@example.com	uploads/1761080501082-808541127.png	https://eta.example.com
10	Theta Labs	theta@example.com	uploads/1761080501082-808541127.png	https://theta.example.com
11	Iota Systems	iota@example.com	uploads/1761080501082-808541127.png	https://iota.example.com
12	Kappa Enterprises	kappa@example.com	uploads/1761080501082-808541127.png	https://kappa.example.com
13	Myfeff	test@example.com	uploads/1761119709918-795143466.png	https://example.com
14	Myfeff	test@example.com	uploads/1761120105360-237785930.png	https://example.com
\.


--
-- Data for Name: company_employees_employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.company_employees_employees ("companyId", "employeesId") FROM stdin;
7	108
9	108
1	109
6	109
8	109
3	110
4	110
3	111
7	111
10	111
2	112
4	112
5	112
7	113
2	114
3	114
10	114
2	115
5	116
9	117
1	118
2	119
4	119
10	119
1	120
4	120
10	120
4	121
5	122
6	122
7	122
4	123
5	123
1	124
2	124
2	125
5	125
6	126
9	126
2	127
3	127
9	127
5	128
6	129
3	130
10	130
7	131
1	132
8	132
10	132
4	133
6	134
7	134
10	134
10	135
10	136
8	137
5	138
6	138
8	138
3	139
5	139
1	140
9	140
10	140
3	141
5	141
2	142
3	142
5	142
2	143
6	143
7	143
2	144
2	145
4	145
7	145
1	146
8	146
4	147
7	147
1	148
8	148
8	149
5	150
5	151
7	151
1	152
3	152
10	153
5	154
7	154
8	154
8	155
10	155
5	156
8	156
2	157
3	157
8	157
3	158
7	158
5	159
3	160
6	160
7	160
7	161
1	162
4	162
6	162
9	163
7	164
10	164
1	165
6	165
3	166
8	166
4	167
10	167
1	168
7	169
10	169
2	170
4	170
5	170
2	171
9	171
10	171
4	172
6	172
8	172
2	173
6	174
1	175
10	175
6	176
1	177
6	177
4	178
5	178
7	178
9	179
5	180
8	180
9	180
2	181
5	181
2	182
4	182
2	183
3	183
5	183
4	184
7	184
8	184
10	185
1	186
1	187
6	187
6	188
5	189
10	189
5	190
6	191
7	191
10	191
10	192
8	193
7	194
1	195
7	195
10	195
4	196
10	196
2	197
9	197
3	198
6	198
7	198
2	199
3	199
9	199
7	200
3	201
10	201
5	202
8	203
10	204
5	205
6	205
8	205
1	206
6	207
10	207
3	208
8	208
9	208
4	209
6	209
2	210
7	210
\.


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees (id, "firstName", "lastName", email, phone) FROM stdin;
108	John	Doe	john.doe@example.com	+380501234567
109	Denys	Samuel	Samuel.d@example.com	+380501664567
110	Lookman	Rest	rest.434@example.com	+3801101664567
111	Ivy	Harris	ivy.harris1@example.com	+380507216385
112	Paul	Taylor	paul.taylor11@example.com	+380507870846
113	Hank	Smith	hank.smith12@example.com	+380508897131
114	Ray	Moore	ray.moore13@example.com	+380509417158
115	Ray	Thomas	ray.thomas14@example.com	+380502054945
116	Eve	Thompson	eve.thompson15@example.com	+380502713800
117	Paul	Martin	paul.martin16@example.com	+380504998292
118	Hank	Davis	hank.davis17@example.com	+380507793227
119	Eve	Martin	eve.martin18@example.com	+380506402935
120	Paul	Moore	paul.moore19@example.com	+380503870330
121	Jack	Taylor	jack.taylor20@example.com	+380509765142
122	Alice	Johnson	alice.johnson21@example.com	+380507912663
123	Bob	White	bob.white22@example.com	+380504359307
124	Ivy	Thomas	ivy.thomas23@example.com	+380502890148
125	John	Johnson	john.johnson2@example.com	+380507511292
126	Kate	Thomas	kate.thomas4@example.com	+380508246837
127	Kate	Thomas	kate.thomas3@example.com	+380508526828
128	Jack	Jackson	jack.jackson24@example.com	+380507574308
129	Olivia	Thomas	olivia.thomas25@example.com	+380508926038
130	David	Taylor	david.taylor26@example.com	+380502580893
131	John	Garcia	john.garcia6@example.com	+380508260352
132	Bob	Wilson	bob.wilson8@example.com	+380504043621
133	Grace	Doe	grace.doe5@example.com	+380506850324
134	Quinn	White	quinn.white7@example.com	+380504390883
135	David	Jackson	david.jackson27@example.com	+380505124081
136	Liam	Brown	liam.brown28@example.com	+380502594895
137	Frank	Anderson	frank.anderson29@example.com	+380506330861
138	Jack	Martinez	jack.martinez30@example.com	+380508980370
139	Ivy	Smith	ivy.smith31@example.com	+380501517909
140	Hank	Williams	hank.williams32@example.com	+380503121172
141	Jack	Miller	jack.miller33@example.com	+380507771354
142	Noah	Martinez	noah.martinez9@example.com	+380508714617
143	Sophia	Miller	sophia.miller10@example.com	+380506399321
144	Frank	Wilson	frank.wilson34@example.com	+380501346170
145	Jack	Doe	jack.doe35@example.com	+380503069866
146	Eve	Taylor	eve.taylor36@example.com	+380507873767
147	Ray	Taylor	ray.taylor37@example.com	+380502631356
148	Kate	White	kate.white38@example.com	+380503782771
149	Mia	Brown	mia.brown39@example.com	+380508084065
150	Olivia	Thompson	olivia.thompson40@example.com	+380508443226
151	Noah	Taylor	noah.taylor41@example.com	+380502750146
152	Quinn	Jackson	quinn.jackson42@example.com	+380501156926
153	John	Thompson	john.thompson43@example.com	+380505507067
154	Ray	Miller	ray.miller44@example.com	+380508110121
155	Frank	Thompson	frank.thompson45@example.com	+380502314217
156	Hank	Doe	hank.doe46@example.com	+380506759198
157	Noah	Garcia	noah.garcia47@example.com	+380503507946
158	Ivy	Garcia	ivy.garcia48@example.com	+380508759242
159	David	Robinson	david.robinson49@example.com	+380509255164
160	Alice	Williams	alice.williams50@example.com	+380503703474
161	Mia	Anderson	mia.anderson51@example.com	+380505265703
162	David	Thomas	david.thomas52@example.com	+380501484173
163	John	Brown	john.brown53@example.com	+380507494791
164	David	Smith	david.smith54@example.com	+380503303087
165	Liam	Garcia	liam.garcia55@example.com	+380508665114
166	Hank	Brown	hank.brown56@example.com	+380507156140
167	Hank	Moore	hank.moore57@example.com	+380501171237
168	Jack	Johnson	jack.johnson58@example.com	+380504447074
169	Bob	Thompson	bob.thompson59@example.com	+380501392426
170	Noah	Moore	noah.moore60@example.com	+380506221102
171	Kate	Doe	kate.doe61@example.com	+380501041382
172	Ray	Taylor	ray.taylor62@example.com	+380501184701
173	David	Wilson	david.wilson63@example.com	+380507859913
174	Paul	Williams	paul.williams64@example.com	+380503318621
175	Ray	Harris	ray.harris65@example.com	+380503560423
176	David	Wilson	david.wilson66@example.com	+380503932973
177	Hank	Miller	hank.miller67@example.com	+380509381424
178	Ivy	Williams	ivy.williams68@example.com	+380504029616
179	Noah	Smith	noah.smith69@example.com	+380508596017
180	Noah	Garcia	noah.garcia70@example.com	+380509950310
181	Noah	Jackson	noah.jackson71@example.com	+380506991998
182	Hank	Moore	hank.moore72@example.com	+380508054048
183	Ivy	Martin	ivy.martin73@example.com	+380505318097
184	Hank	White	hank.white74@example.com	+380506062229
185	Noah	Smith	noah.smith75@example.com	+380501674064
186	Hank	Brown	hank.brown76@example.com	+380504066002
187	David	Robinson	david.robinson77@example.com	+380509000085
188	Ray	Brown	ray.brown78@example.com	+380508662220
189	Hank	Wilson	hank.wilson79@example.com	+380501231028
190	Liam	Martin	liam.martin80@example.com	+380503484291
191	John	Harris	john.harris81@example.com	+380508131079
192	Noah	Williams	noah.williams82@example.com	+380506739091
193	Sophia	Anderson	sophia.anderson83@example.com	+380509887958
194	Eve	Martin	eve.martin84@example.com	+380508717375
195	Liam	Taylor	liam.taylor85@example.com	+380501518083
196	Liam	Thompson	liam.thompson86@example.com	+380503921647
197	Olivia	Robinson	olivia.robinson87@example.com	+380507976538
198	Quinn	Martin	quinn.martin88@example.com	+380505312047
199	Mia	White	mia.white89@example.com	+380506245183
200	Carol	Moore	carol.moore90@example.com	+380502646711
201	Hank	Williams	hank.williams91@example.com	+380502835289
202	Hank	Smith	hank.smith92@example.com	+380505865859
208	Eve	Johnson	eve.johnson98@example.com	+380508387106
203	Bob	Harris	bob.harris93@example.com	+380501351086
209	Grace	Garcia	grace.garcia99@example.com	+380504238546
204	Ray	Moore	ray.moore94@example.com	+380504410051
210	Hank	Wilson	hank.wilson100@example.com	+380501734403
205	Liam	Taylor	liam.taylor95@example.com	+380509937914
206	Grace	Taylor	grace.taylor96@example.com	+380506231281
207	Alice	Davis	alice.davis97@example.com	+380504950515
\.


--
-- Name: auth_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_id_seq', 6, true);


--
-- Name: company_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.company_id_seq', 14, true);


--
-- Name: employees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employees_id_seq', 210, true);


--
-- Name: company PK_056f7854a7afdba7cbd6d45fc20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY (id);


--
-- Name: auth PK_7e416cf6172bc5aec04244f6459; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth
    ADD CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY (id);


--
-- Name: company_employees_employees PK_8867abd59215b4b651b15f8027c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company_employees_employees
    ADD CONSTRAINT "PK_8867abd59215b4b651b15f8027c" PRIMARY KEY ("companyId", "employeesId");


--
-- Name: employees PK_b9535a98350d5b26e7eb0c26af4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY (id);


--
-- Name: auth UQ_b54f616411ef3824f6a5c06ea46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth
    ADD CONSTRAINT "UQ_b54f616411ef3824f6a5c06ea46" UNIQUE (email);


--
-- Name: IDX_055a78566354ea95f628a634b1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_055a78566354ea95f628a634b1" ON public.company_employees_employees USING btree ("employeesId");


--
-- Name: IDX_18a71893d3accd7988d428df47; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_18a71893d3accd7988d428df47" ON public.company_employees_employees USING btree ("companyId");


--
-- Name: company_employees_employees FK_055a78566354ea95f628a634b1a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company_employees_employees
    ADD CONSTRAINT "FK_055a78566354ea95f628a634b1a" FOREIGN KEY ("employeesId") REFERENCES public.employees(id);


--
-- Name: company_employees_employees FK_18a71893d3accd7988d428df479; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company_employees_employees
    ADD CONSTRAINT "FK_18a71893d3accd7988d428df479" FOREIGN KEY ("companyId") REFERENCES public.company(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict yh9oL8aKOE9N2MH9VCKMvYoTifaP5u8SnP5rBadSGeiALazkyRen8xHgSPDeoQ8

