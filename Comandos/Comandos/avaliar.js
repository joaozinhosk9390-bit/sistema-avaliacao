const { Client, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "avaliar",
    description: "Deixe uma avaliação na nossa loja",
    category: "Utilidade",
    options: [
        {
          name: "vendedor",
          description: "Mencione o vendedor",
          type: 6,
          required: true,
        },
        {
            name: "avaliar",
            description: "Selecione de 1 estrela a 5 para a qualidade do produto ou serviço",
            type: 3,
            required: true,
            choices: [
                { name: "⭐", value: "⭐" },
                { name: "⭐⭐", value: "⭐⭐" },
                { name: "⭐⭐⭐", value: "⭐⭐⭐" },
                { name: "⭐⭐⭐⭐", value: "⭐⭐⭐⭐" },
                { name: "⭐⭐⭐⭐⭐", value: "⭐⭐⭐⭐⭐"},
            ]
        },
        {
            name: "texto",
            description: "Descreva a sua avaliação",
            type: 3,
            required: true,
        },
    ],

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    run: async (client, interaction) => {

        const { options, guild } = interaction;
        const vendedor = options.getUser("vendedor");
        const estrelas = options.getString("avaliar");
        const texto = options.getString("texto");

        const ID = "1095743502677188777"; // Canal onde será enviado a avaliação

        const embed = new EmbedBuilder()
          .setAuthor({ name: guild.name, iconURL: guild.iconURL({ dynamic: true }) })
          .setTitle('Sistema de Feedback :star:')
          .addFields([
            {
              name: ':writing_hand: ┃ Feedback enviado por:',
              value: `> ${interaction.user} \`[${interaction.user.tag}]\``,
            },
            {
              name: ':bust_in_silhouette: ┃ Atendido por:',
              value: `> ${vendedor} \`[${vendedor.tag}]\``,
            },
            {
              name: '🏆 ┃ Estrelas:',
              value: `> ${estrelas}`,
            },
            {
              name: ':scroll: ┃ Feedback:',
              value: "```" + texto + "```",
            },
          ])
          .setColor('2f3136')
          .setThumbnail(guild.iconURL({ dynamic: true }))
          .setFooter({ text: `© ${guild.name} ┃ Desenvolvido por kn#9639`, iconURL: guild.iconURL() })
          .setTimestamp();

        guild.channels.cache.get(ID).send({
          embeds: [embed],
        });

        await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setDescription(`A sua avaliação foi enviada com sucesso para o canal <#${ID}>, \n\nCaso tenha alguma dúvida nos contate por ticket [Clicando Aqui](https://discord.com/channels/977017524703076402/977030471064100884) \n\nObrigado pela preferência :)`)
              .setColor('Green'),
          ],
          ephemeral: true,
        });

    }
}
