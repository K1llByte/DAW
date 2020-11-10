<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">

    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="pages/index.html">
            <html>
                <head>
                    <!-- <meta charset="UTF-8"/> -->
                    <title>Titulo</title>
                </head>
                <body>
                    <h2>Header 2</h2>
                    <h3>Header 3</h3>
                    <ol>
                        <xsl:apply-templates select="//ARQELEM" mode="indice">
                            <xsl:sort select="IDENTI"/>
                        </xsl:apply-templates>
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>
    
    <!-- Template de indice -->
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <xsl:variable name="i" select="count(preceding-sibling::*)+1"/>
            <a name="i{$i}"/>
            <a href="http://localhost:7777/arq/{$i}">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
        
    </xsl:template>
    
    <!-- Template de conteudo -->
    
    <xsl:template match="ARQELEM">
        <xsl:variable name="i" select="count(preceding-sibling::*)+1"/>
        <xsl:result-document href="pages/arq{$i}.html">
            <html>
                <head>
                    <title>
                        <xsl:value-of select="IDENTI"/>
                    </title>
                </head>
                <body>
                    <!-- <a name="{generate-id()}"/> -->
                    <p><b>Tipo: </b><xsl:apply-templates select="TIPO"/></p>
                    <p><b>Titulo</b> <xsl:value-of select="IDENTI"/> </p>
                    <xsl:apply-templates select="IMAGEM"/>
                    <xsl:apply-templates select="DESCRI"/>
                    <xsl:apply-templates select="CRONO"/>
                    <p><b>Lugar</b> <xsl:value-of select="LUGAR"/> </p>
                    <p><b>Freguesia</b> <xsl:value-of select="FREGUE"/> </p>
                    <p><b>Concelho</b> <xsl:value-of select="CONCEL"/> </p>
                    <xsl:apply-templates select="CODADM"/>
                    <xsl:apply-templates select="LATITU"/>
                    <xsl:apply-templates select="LONGIT"/>
                    <xsl:apply-templates select="ALTITU"/>
                    <xsl:apply-templates select="ACESSO"/>
                    <xsl:apply-templates select="QUADRO"/>
                    <xsl:apply-templates select="DESARQ"/>
                    <xsl:apply-templates select="INTERP"/>
                    <xsl:apply-templates select="DEPOSI"/>
                    <xsl:apply-templates select="INTERE"/>
                    <xsl:apply-templates select="BIBLIO"/>
                    <p><b>Autor </b> <xsl:value-of select="AUTOR"/> </p>
                    <xsl:apply-templates select="TRAARQ"/>
                    <p><b>Data </b> <xsl:value-of select="DATA"/> </p>
                    <!-- <p><b>Provincia</b> <xsl:value-of select="prov"/> </p>
                    <p><b>Local</b> <xsl:value-of select="local"/> </p>
                    <p><b>Instrumento</b> <xsl:value-of select="inst"/> </p>
                    <p><b>Duração</b> <xsl:value-of select="duracao"/> </p> -->
                    <address><a href="{$i -1}">Anterior</a></address>
                    <address><a href="index.html#i{$i}">Voltar ao índice</a></address>
                    <address><a href="{$i +1}">Próximo</a></address>
                    
                </body>
            </html>
        </xsl:result-document>
        
    </xsl:template>
    
    <!-- Specific Field Templates -->

    <xsl:template match="LIGA">
        <i><u><xsl:value-of select="."/></u></i>
    </xsl:template>

    <xsl:template match="TIPO">
        <i><xsl:apply-templates select="@ASSUNTO"/></i>
    </xsl:template>

    <xsl:template match="IMAGEM">
        <b>Imagem </b>
            <img>
                <xsl:attribute name="src">
                    <xsl:value-of select="@NOME"/>
                </xsl:attribute>
            </img>
    </xsl:template>

    <xsl:template match="DESCRI">
        <p>
            <b>Descrição </b><xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="CRONO">
        <p>
            <b>Crono </b><xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="LUGAR">
        <p>
            <b>Lugar </b><xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="FREGUE">
        <p>
            <b>Freguesia </b><xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="CONCEL">
        <p>
            <b>Concelho </b><xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="CODADM">
        <p>
            <b>Codadm </b><xsl:value-of select="."/>
        </p>
    </xsl:template>

    <xsl:template match="LATITU">
        <p>
            <b>Latitude </b><xsl:value-of select="."/>
        </p>
    </xsl:template>

    <xsl:template match="LONGIT">
        <p>
            <b>LOngitude </b><xsl:value-of select="."/>
        </p>
    </xsl:template>

    <xsl:template match="ALTITU">
        <p>
            <b>Altitude </b><xsl:value-of select="."/>
        </p>
    </xsl:template>

    <xsl:template match="ACESSO">
        <p>
            <b>Acesso </b><xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="QUADRO">
        <p>
            <b>Quadro </b><xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="DESARQ">
        <p>
            <b>Desarq </b><xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="INTERP">
        <p>
            <b>Interp </b><xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="DEPOSI">
        <p>
            <b>Depositos </b><xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="INTERE">
        <p>
            <b>Intere </b><xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="BIBLIO">
        <p>
            <b>Biblio </b><xsl:value-of select="."/>
        </p>
    </xsl:template> 

    <xsl:template match="TRAARQ">
        <p>
            <b>Traarq </b><xsl:value-of select="."/>
        </p>
    </xsl:template> 

</xsl:stylesheet>