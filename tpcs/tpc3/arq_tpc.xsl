<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:template match="/">
        <xsl:result-document href="tpcsite/index.html">
            <html>
                <head>
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
            <a name="i{generate-id()}"/>
            <a href="{generate-id()}.html">
                <xsl:value-of select="IDENTI"/>
                
            </a>
        </li>
        
    </xsl:template>
    
    <!-- Template de conteudo -->
    
    <xsl:template match="ARQELEM">
        
        <xsl:result-document href="tpcsite/{generate-id()}.html">
            <html>
                <head>
                    <title>
                        <xsl:value-of select="IDENTI"/>
                    </title>
                </head>
                <body>
                    <a name="{generate-id()}"/>
                    <p><b>Titulo</b> <xsl:value-of select="IDENTI"/> </p>
                    <!-- <p><b>Provincia</b> <xsl:value-of select="prov"/> </p>
                    <p><b>Local</b> <xsl:value-of select="local"/> </p>
                    <p><b>Instrumento</b> <xsl:value-of select="inst"/> </p>
                    <p><b>Duração</b> <xsl:value-of select="duracao"/> </p> -->
                    <address><a href="index.html#i{generate-id()}">Voltar ao índice</a></address>
                </body>
            </html>
        </xsl:result-document>
        
    </xsl:template>
    
</xsl:stylesheet>